from models.assuntoModel import inserir_assunto, buscar_todos_assuntos, buscar_assunto_por_id, atualizar_assunto, excluir_assunto

def criar_assunto(payload):
    usuario_id = (payload.get("usuario_id") or "")
    titulo = (payload.get("titulo") or "").strip()
    if not usuario_id or not titulo:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400
    try:
        novo_id = inserir_assunto(usuario_id, titulo)
        return {"mensagem": "Assunto criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500

def listar_assuntos():
    dados = buscar_todos_assuntos()
    return dados, 200

def listar_assunto_por_id(id):
    row = buscar_assunto_por_id(id)
    if row is None:
        return {"erro": "Assunto não encontrado."}, 404
    return dict(row), 200

def editar_assunto(id, payload):
    campos = []
    valores = []
    for campo in ["usuario_id", "titulo"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())
    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400
    try:
        linhas = atualizar_assunto(id, campos, valores)
        if linhas == 0:
            return {"erro": "Assunto não encontrado."}, 404
        return {"mensagem": "Assunto atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500

def deletar_assunto(id):
    try:
        linhas = excluir_assunto(id)
        if linhas == 0:
            return {"erro": "Assunto não encontrado."}, 404
        return {"mensagem": "Assunto excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
