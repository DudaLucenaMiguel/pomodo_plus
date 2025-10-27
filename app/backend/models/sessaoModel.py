from database.db import get_connection

def inserir_sessao(usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO sessao (usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_todas_sessoes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessao")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_sessoes_por_usuario(usuario_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessao WHERE usuario_id = ?", (usuario_id,))
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_sessao_por_id(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessao WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    return row

def atualizar_sessao(id, campos, valores):
    conn = get_connection()
    cursor = conn.cursor()
    valores.append(id)
    cursor.execute(f"UPDATE sessao SET {', '.join(campos)} WHERE id = ?", valores)
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas

def excluir_sessao(id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM sessao WHERE id = ?", (int(id),))
    linhas = cur.rowcount
    conn.commit()
    conn.close()
    return linhas

