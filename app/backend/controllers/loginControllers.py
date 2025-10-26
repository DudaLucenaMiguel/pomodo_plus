import secrets

from models.loginModel import autenticar_usuario


def realizar_login(payload):
    email = (payload.get("email") or "").strip().lower()
    senha = (payload.get("senha") or "").strip()

    if not email or not senha:
        return {"erro": "Campos 'email' e 'senha' são obrigatórios."}, 400

    try:
        usuario = autenticar_usuario(email, senha)
    except Exception as exc:  # pragma: no cover - proteção adicional
        return {"erro": str(exc)}, 500

    if usuario is None:
        return {"erro": "Credenciais inválidas."}, 401

    token = secrets.token_urlsafe(32)
    return {
        "mensagem": "Login realizado com sucesso.",
        "token": token,
        "usuario": usuario,
    }, 200
