# main.py
import sqlite3
import os

# Caminho fixo do banco real
DB_PATH = r"C:\Users\dudal\OneDrive\Documentos\GitHub\pomodo_plus\app\backend\database\pomodoroplus.db"

USERS = [
    ("Duda",    "duda@email.com",    "ABC123"),
    ("Klaus",   "klaus@email.com",   "ABC123"),
    ("Rafael",  "rafael@email.com",  "ABC123"),
    ("Carol",   "carol@email.com",   "ABC123"),
    ("Antonio", "antonio@email.com", "ABC123"),
    ("Lucy",    "lucy@email.com",    "ABC123"),
]

# Três ciclos por usuário (A, B, C)
CYCLE_MODELS = [
    (4, 25, 5, 15),   # A
    (6, 25, 5, 20),   # B
    (4, 15, 10, 20),  # C
]

# Quatro sessões por usuário, todas encerradas (CONCLUIDA).
# As três primeiras usam os ciclos A, B e C; a quarta repete A.
SESSION_TEMPLATES = [
    ("2025-10-20T09:00:00", "2025-10-20T11:30:00", "CONCLUIDA"),  # A
    ("2025-10-21T14:00:00", "2025-10-21T17:45:00", "CONCLUIDA"),  # B
    ("2025-10-22T19:00:00", "2025-10-22T21:00:00", "CONCLUIDA"),  # C
    ("2025-10-23T08:00:00", "2025-10-23T10:00:00", "CONCLUIDA"),  # A (reuso)
]


def ensure_schema(conn):
    conn.execute("PRAGMA foreign_keys = ON;")

    conn.execute("""
    CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    );
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS ciclo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        repeticoes INTEGER NOT NULL,
        tempo_estudo INTEGER NOT NULL,
        tempo_descanso INTEGER NOT NULL,
        tempo_entre_ciclos INTEGER NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
    );
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS sessao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        ciclo_id INTEGER NOT NULL,
        assunto_id INTEGER,
        tema_id INTEGER,
        inicio TEXT NOT NULL,
        fim TEXT,
        status TEXT NOT NULL CHECK (
            status IN ('PLANEJADA','EM_ANDAMENTO','PAUSADA','CONCLUIDA','INTERROMPIDA','CANCELADA')
        ),
        FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
        FOREIGN KEY (ciclo_id) REFERENCES ciclo(id) ON DELETE CASCADE
    );
    """)


def seed(conn):
    emails = [e for _, e, _ in USERS]

    with conn:
        # Limpa dados anteriores desses usuários
        cur = conn.execute(
            f"SELECT id FROM usuario WHERE email IN ({','.join(['?']*len(emails))})",
            emails
        )
        user_ids = [r[0] for r in cur.fetchall()]

        if user_ids:
            conn.execute(
                f"DELETE FROM sessao WHERE usuario_id IN ({','.join(['?']*len(user_ids))})",
                user_ids
            )
            conn.execute(
                f"DELETE FROM ciclo WHERE usuario_id IN ({','.join(['?']*len(user_ids))})",
                user_ids
            )
            conn.execute(
                f"DELETE FROM usuario WHERE id IN ({','.join(['?']*len(user_ids))})",
                user_ids
            )

        # Insere usuários
        conn.executemany(
            "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);",
            USERS
        )

        # Mapeia email -> id
        cur = conn.execute(
            f"SELECT id, email FROM usuario WHERE email IN ({','.join(['?']*len(emails))})",
            emails
        )
        email_to_id = {e: i for i, e in cur.fetchall()}

        # Insere ciclos (A, B, C) por usuário
        user_cycles = {e: [] for e in emails}
        for _, email, _ in USERS:
            uid = email_to_id[email]
            for r, te, td, ti in CYCLE_MODELS:
                cur = conn.execute("""
                    INSERT INTO ciclo (usuario_id, repeticoes, tempo_estudo, tempo_descanso, tempo_entre_ciclos)
                    VALUES (?, ?, ?, ?, ?)
                """, (uid, r, te, td, ti))
                user_cycles[email].append(cur.lastrowid)

        # Insere 4 sessões concluídas por usuário
        # Uso de ciclo: A, B, C, A (reutiliza o primeiro ciclo para a 4ª sessão)
        for _, email, _ in USERS:
            uid = email_to_id[email]
            cycles_for_user = user_cycles[email]  # [id_A, id_B, id_C]
            for idx, (inicio, fim, status) in enumerate(SESSION_TEMPLATES):
                ciclo_id = cycles_for_user[idx % 3]  # 0->A, 1->B, 2->C, 3->A
                conn.execute("""
                    INSERT INTO sessao (usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status)
                    VALUES (?, ?, NULL, NULL, ?, ?, ?)
                """, (uid, ciclo_id, inicio, fim, status))

    # Relatório
    uc = conn.execute("SELECT COUNT(*) FROM usuario WHERE email IN ({})".format(
        ",".join(["?"]*len(emails))
    ), emails).fetchone()[0]
    cc = conn.execute("""
        SELECT COUNT(*) FROM ciclo WHERE usuario_id IN (
            SELECT id FROM usuario WHERE email IN ({})
        )
    """.format(",".join(["?"]*len(emails))), emails).fetchone()[0]
    sc = conn.execute("""
        SELECT COUNT(*) FROM sessao WHERE usuario_id IN (
            SELECT id FROM usuario WHERE email IN ({})
        )
    """.format(",".join(["?"]*len(emails))), emails).fetchone()[0]

    print(f"✅ Seed concluído. usuários={uc}, ciclos={cc}, sessões={sc}")


if __name__ == "__main__":
    if not os.path.exists(DB_PATH):
        print(f"❌ Banco de dados não encontrado em:\n{DB_PATH}")
        print("Verifique o caminho e tente novamente.")
    else:
        print(f"Conectando ao banco existente:\n{DB_PATH}")
        conn = sqlite3.connect(DB_PATH)
        conn.execute("PRAGMA foreign_keys = ON;")
        ensure_schema(conn)
        seed(conn)
        conn.close()
        print("🏁 Finalizado.")
