from database.db import get_connection

def _clean_value(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    return str(value).strip()

def criar_usuario(payload: dict):
    nome = _clean_value(payload.get("nome"))
    email = _clean_value(payload.get("email"))
    senha = _clean_value(payload.get("senha"))

    if not nome or not email or not senha:
        return {"erro": "Campos 'nome', 'email' e 'senha' são obrigatórios."}, 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
            (nome, email, senha)
        )
        conn.commit()
        novo_id = cursor.lastrowid
        return {"mensagem": "Usuário criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def listar_usuarios():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuario")
    dados = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return dados, 200


def listar_usuario_por_id(id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM usuario WHERE id = ?", (id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return {"erro": "Usuário não encontrado."}, 404
    return dict(row), 200


def editar_usuario(id: int, payload: dict):
    conn = get_connection()
    cursor = conn.cursor()

    campos = []
    valores = []

    for campo in ["nome", "email", "senha"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    valores.append(id)

    try:
        cursor.execute(f"UPDATE usuario SET {', '.join(campos)} WHERE id = ?", valores)
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Usuário não encontrado."}, 404
        return {"mensagem": "Usuário atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()


def deletar_usuario(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM usuario WHERE id = ?", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            return {"erro": "Usuário não encontrado."}, 404
        return {"mensagem": "Usuário excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
    finally:
        conn.close()
