from database.db import get_connection

def _clean_value(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    return str(value).strip()

def criar_assunto(payload: dict):
    usuario_id = _clean_value(payload.get("usuario_id"))
    titulo = _clean_value(payload.get("titulo"))
    

    if not usuario_id or not titulo:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO assunto (usuario_id, titulo) VALUES (?, ?)",
            (usuario_id, titulo)
        )
        conn.commit()
        novo_id = cursor.lastrowid
        return {"mensagem": "Assunto criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def listar_assunto():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assunto")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados, 200


def listar_assunto_por_id(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM assunto WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return {"erro": "Assunto não encontrado."}, 404
    return dict(row), 200


def editar_assunto(id: int, payload: dict):
    conn = get_connection()
    cursor = conn.cursor()

    campos = []
    valores = []

    for campo in ["usuario_id","titulo"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    valores.append(id)

    try:
        cursor.execute(f"UPDATE assunto SET {', '.join(campos)} WHERE id = ?", valores)
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Assunto não encontrado."}, 404
        return {"mensagem": "Assunto atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def deletar_assunto(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM assunto WHERE id = ?", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Assunto não encontrado."}, 404
        return {"mensagem": "Assunto excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()
