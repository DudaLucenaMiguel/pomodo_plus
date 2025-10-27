from models.usuarioModel import buscar_usuario_por_email, inserir_usuario
from werkzeug.security import generate_password_hash, check_password_hash

def cadastrar_usuario(payload):
    nome = (payload.get("nome") or "").strip()
    email = (payload.get("email") or "").strip()
    senha = (payload.get("senha") or "").strip()
    if not nome or not email or not senha:
        return {"erro": "Campos 'nome', 'email' e 'senha' são obrigatórios."}, 400
    existente = buscar_usuario_por_email(email)
    if existente:
        return {"erro": "E-mail já cadastrado."}, 409
    senha_hash = generate_password_hash(senha)
    novo_id = inserir_usuario(nome, email, senha_hash)
    return {"mensagem": "Usuário cadastrado com sucesso.", "id": novo_id}, 201

def login_usuario(payload):
    email = (payload.get("email") or "").strip()
    senha = (payload.get("senha") or "").strip()
    if not email or not senha:
        return {"erro": "Campos 'email' e 'senha' são obrigatórios."}, 400
    row = buscar_usuario_por_email(email)
    if row is None or not check_password_hash(row["senha"], senha):
        return {"erro": "Credenciais inválidas."}, 401
    usuario = {"id": row["id"], "nome": row["nome"], "email": row["email"]}
    return {"mensagem": "Login bem-sucedido.", "usuario": usuario}, 200
