from database.db import get_connection


def autenticar_usuario(email, senha):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?",
        (email, senha),
    )
    row = cursor.fetchone()
    conn.close()
    if row is None:
        return None
    return dict(row)
