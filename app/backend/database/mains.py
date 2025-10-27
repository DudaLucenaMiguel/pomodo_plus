import sqlite3, os

DB_PATH = os.getenv("DB_PATH", r"C:\Users\dudal\OneDrive\Documentos\GitHub\pomodo_plus\app\backend\database\pomodoroplus.db")

conn = sqlite3.connect(DB_PATH)
conn.execute("PRAGMA foreign_keys = OFF;")
cur = conn.cursor()

cur.execute("BEGIN TRANSACTION;")

cur.execute("""
CREATE TABLE IF NOT EXISTS sessao_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER NOT NULL,
  ciclo_id INTEGER NULL,
  assunto_id INTEGER NULL,
  tema_id INTEGER NULL,
  inicio TEXT NOT NULL,
  fim TEXT,
  status TEXT DEFAULT 'completed',
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (ciclo_id)  REFERENCES ciclo(id) ON DELETE SET NULL,
  FOREIGN KEY (assunto_id) REFERENCES assunto(id),
  FOREIGN KEY (tema_id)    REFERENCES tema(id)
);
""")

cur.execute("""
INSERT INTO sessao_new (id, usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status)
SELECT
  id,
  usuario_id,
  NULLIF(ciclo_id, ''),
  assunto_id,
  tema_id,
  inicio,
  fim,
  status
FROM sessao;
""")

cur.execute("DROP TABLE sessao;")
cur.execute("ALTER TABLE sessao_new RENAME TO sessao;")

conn.commit()
conn.execute("PRAGMA foreign_keys = ON;")
conn.close()

print("Migração concluída: ciclo_id agora aceita NULL.")
