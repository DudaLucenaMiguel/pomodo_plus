from models.cadastroModel import cadastrar_usuario


def realizar_cadastro(payload):
    nome = (payload.get("nome") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    senha = (payload.get("senha") or "").strip()

    if not nome or not email or not senha:
        return {"erro": "Campos 'nome', 'email' e 'senha' são obrigatórios."}, 400

    try:
        usuario = cadastrar_usuario(nome, email, senha)
    except ValueError as exc:
        return {"erro": str(exc)}, 409
    except Exception as exc:  # pragma: no cover - proteção adicional
        return {"erro": str(exc)}, 500

    return {
        "mensagem": "Cadastro realizado com sucesso.",
        "usuario": usuario,
    }, 201
