from database.db import get_connection

def _clean_value(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    return str(value).strip()

def criar_tema(payload: dict):
    usuario_id = _clean_value(payload.get("usuario_id"))
    assunto_id = _clean_value(payload.get("assunto_id"))
    titulo = _clean_value(payload.get("titulo"))
    

    if not usuario_id or not assunto_id or not titulo:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO tema (usuario_id, assunto_id, titulo) VALUES (?, ?)",
            (usuario_id, titulo)
        )
        conn.commit()
        novo_id = cursor.lastrowid
        return {"mensagem": "Tema criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def listar_temas():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tema")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados, 200


def listar_tema_por_id(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tema WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return {"erro": "Tema não encontrado."}, 404
    return dict(row), 200


def editar_tema(id: int, payload: dict):
    conn = get_connection()
    cursor = conn.cursor()

    campos = []
    valores = []

    for campo in ["usuario_id", "assunto_id","titulo"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    valores.append(id)

    try:
        cursor.execute(f"UPDATE tema SET {', '.join(campos)} WHERE id = ?", valores)
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Tema não encontrado."}, 404
        return {"mensagem": "Tema atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def deletar_tema(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM tema WHERE id = ?", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Tema não encontrado."}, 404
        return {"mensagem": "Tema excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()
