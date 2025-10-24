from database.db import get_connection

def inserir_usuario(nome, email, senha):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)", (nome, email, senha))
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_todos_usuarios():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuario")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_usuario_por_id(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuario WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    return row

def atualizar_usuario(id, campos, valores):
    conn = get_connection()
    cursor = conn.cursor()
    valores.append(id)
    cursor.execute(f"UPDATE usuario SET {', '.join(campos)} WHERE id = ?", valores)
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas

def excluir_usuario(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuario WHERE id = ?", (id,))
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas
