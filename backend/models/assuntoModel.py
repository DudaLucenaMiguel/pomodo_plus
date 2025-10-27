from database.db import get_connection

def inserir_assunto(usuario_id, titulo):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO assunto (usuario_id, titulo) VALUES (?, ?)",
        (usuario_id, titulo)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_todos_assuntos():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assunto")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_assunto_por_id(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assunto WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    return row

def atualizar_assunto(id, campos, valores):
    conn = get_connection()
    cursor = conn.cursor()
    valores.append(id)
    cursor.execute(f"UPDATE assunto SET {', '.join(campos)} WHERE id = ?", valores)
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas

def excluir_assunto(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM assunto WHERE id = ?", (id,))
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas
