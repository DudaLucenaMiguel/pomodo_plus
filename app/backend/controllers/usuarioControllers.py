from models.usuarioModel import (
    inserir_usuario,
    buscar_todos_usuarios,
    buscar_usuario_por_id,
    buscar_usuario_por_email,
    atualizar_usuario,
    excluir_usuario,
)


def criar_usuario(payload):
    nome = (payload.get("nome") or "").strip()
    email = (payload.get("email") or "").strip()
    senha = (payload.get("senha") or "").strip()
    if not nome or not email or not senha:
        return {"erro": "Campos 'nome', 'email' e 'senha' são obrigatórios."}, 400

    existente = buscar_usuario_por_email(email)
    if existente:
        return {"erro": "E-mail já cadastrado."}, 409

    try:
        novo_id = inserir_usuario(nome, email, senha)
        return {"mensagem": "Usuário criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500


def listar_usuarios():
    dados = buscar_todos_usuarios()
    return dados, 200


def listar_usuario_por_id(id):
    row = buscar_usuario_por_id(id)
    if row is None:
        return {"erro": "Usuário não encontrado."}, 404
    return dict(row), 200


def autenticar_usuario(payload):
    email = (payload.get("email") or "").strip()
    senha = (payload.get("senha") or "").strip()
    if not email or not senha:
        return {"erro": "Campos 'email' e 'senha' são obrigatórios."}, 400

    row = buscar_usuario_por_email(email)
    if row is None or row["senha"] != senha:
        return {"erro": "Credenciais inválidas."}, 401

    usuario = {
        "id": row["id"],
        "nome": row["nome"],
        "email": row["email"],
    }
    return {"mensagem": "Login bem-sucedido.", "usuario": usuario}, 200


def editar_usuario(id, payload):
    campos = []
    valores = []
    for campo in ["nome", "email", "senha"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())
    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400
    try:
        linhas = atualizar_usuario(id, campos, valores)
        if linhas == 0:
            return {"erro": "Usuário não encontrado."}, 404
        return {"mensagem": "Usuário atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500


def deletar_usuario(id):
    try:
        linhas = excluir_usuario(id)
        if linhas == 0:
            return {"erro": "Usuário não encontrado."}, 404
        return {"mensagem": "Usuário excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
