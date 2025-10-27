from database.db import get_connection

def inserir_tema(usuario_id, assunto_id, titulo):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tema (usuario_id, assunto_id, titulo) VALUES (?, ?, ?)",
        (usuario_id, assunto_id, titulo)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_todos_temas():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tema")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_tema_por_id(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tema WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    return row

def atualizar_tema(id, campos, valores):
    conn = get_connection()
    cursor = conn.cursor()
    valores.append(id)
    cursor.execute(f"UPDATE tema SET {', '.join(campos)} WHERE id = ?", valores)
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas

def excluir_tema(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tema WHERE id = ?", (id,))
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas
