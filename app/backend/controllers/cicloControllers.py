from database.db import get_connection

def criar_ciclo(payload: dict):
    usuario_id = (payload.get("usuario_id") or "").strip()
    repeticoes = (payload.get("repeticoes") or "").strip()
    tempo_estudo = (payload.get("tempo_estudo") or "").strip()
    tempo_descanso = (payload.get("tempo_descanso") or "").strip()
    tempo_entre_ciclos = (payload.get("usuario_id") or "").strip()
    
    if not usuario_id or not repeticoes or not tempo_estudo or not tempo_descanso or not tempo_entre_ciclos:
          return {"erro": "Campos obrigatórios não preenchidos."}, 400
    
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO ciclo (usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos) VALUES (?, ?, ?, ?)",
            (usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos)
        )
        conn.commit()
        novo_id = cursor.lastrowid
        return {"mensagem": "Ciclo criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()

def listar_ciclos():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ciclo")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados, 200

def listar_ciclos_por_id(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ciclo WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return {"erro": "Ciclo não encontrado."}, 404
    return dict(row), 200

def editar_ciclo(id: int, payload: dict):
    conn = get_connection()
    cursor = conn.cursor()

    campos = []
    valores = []

    for campo in ["usuario_id", "tempo_estudo", "tempo_descanso", "tempo_entre_ciclos"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    valores.append(id)

    try:
        cursor.execute(f"UPDATE ciclo SET {', '.join(campos)} WHERE id = ?", valores)
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Ciclo não encontrado."}, 404
        return {"mensagem": "Ciclo atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()

def deletar_ciclo(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM ciclo WHERE id = ?", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Ciclo não encontrado."}, 404
        return {"mensagem": "Ciclo excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()
