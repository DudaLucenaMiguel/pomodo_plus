from database.db import get_connection


def cadastrar_usuario(nome, email, senha):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM usuario WHERE email = ?", (email,))
    if cursor.fetchone() is not None:
        conn.close()
        raise ValueError("E-mail já cadastrado.")

    cursor.execute(
        "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
        (nome, email, senha),
    )
    conn.commit()
    novo_id = cursor.lastrowid

    cursor.execute(
        "SELECT id, nome, email FROM usuario WHERE id = ?",
        (novo_id,),
    )
    row = cursor.fetchone()
    conn.close()

    return dict(row) if row else {"id": novo_id, "nome": nome, "email": email}
