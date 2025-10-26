from database.db import get_connection

def inserir_ciclo(usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO ciclo (usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos) VALUES (?, ?, ?, ?)",
        (usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos)
    )
    conn.commit()
    novo_id = cursor.lastrowid
    conn.close()
    return novo_id

def buscar_todos_ciclos():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ciclo")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_ciclos_por_usuario(usuario_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ciclo WHERE usuario_id = ?", (usuario_id,))
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados

def buscar_ciclo_por_id(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ciclo WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()
    return row

def atualizar_ciclo(id, campos, valores):
    conn = get_connection()
    cursor = conn.cursor()
    valores.append(id)
    cursor.execute(f"UPDATE ciclo SET {', '.join(campos)} WHERE id = ?", valores)
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas

def excluir_ciclo(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM ciclo WHERE id = ?", (id,))
    conn.commit()
    linhas_afetadas = cursor.rowcount
    conn.close()
    return linhas_afetadas
