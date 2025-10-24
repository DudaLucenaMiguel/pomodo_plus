from database.db import get_connection

def criar_sessao(payload: dict):
    usuario_id = (payload.get("usuario_id") or "")
    ciclo_id = (payload.get("ciclo_id") or "")
    assunto_id = (payload.get("assunto_id") or "")
    tema_id = (payload.get("tema_id") or "")
    inicio = (payload.get("inicio") or "")
    fim = (payload.get("fim") or "")
    status = (payload.get("status") or "")
    
    if not usuario_id or not ciclo_id or not inicio or not status:
          return {"erro": "Campos obrigatórios não preenchidos."}, 400
    
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO sessao (usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status)
        )
        conn.commit()
        novo_id = cursor.lastrowid
        return {"mensagem": "Sessão criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()

def listar_sessoes():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessao")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados, 200

def listar_sessao_por_id(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sessao WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return {"erro": "Sessão não encontrado."}, 404
    return dict(row), 200

def editar_sessao(id: int, payload: dict):
    conn = get_connection()
    cursor = conn.cursor()

    campos = []
    valores = []

    for campo in ["usuario_id", "ciclo_id", "assunto_id", "tema_id", "inicio", "fim", "status"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    valores.append(id)

    try:
        cursor.execute(f"UPDATE sessao SET {', '.join(campos)} WHERE id = ?", valores)
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Sessão não encontrada."}, 404
        return {"mensagem": "Sessão atualizada com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()

def deletar_sessao(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM sessao WHERE id = ?", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Sessão não encontrada."}, 404
        return {"mensagem": "Sessão excluída com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()
