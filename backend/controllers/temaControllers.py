from models.temaModel import inserir_tema, buscar_todos_temas, buscar_tema_por_id, atualizar_tema, excluir_tema

def criar_tema(payload):
    usuario_id = (payload.get("usuario_id") or "")
    assunto_id = (payload.get("assunto_id") or "")
    titulo = (payload.get("titulo") or "").strip()
    if not usuario_id or not assunto_id or not titulo:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400
    try:
        novo_id = inserir_tema(usuario_id, assunto_id, titulo)
        return {"mensagem": "Tema criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500

def listar_temas():
    dados = buscar_todos_temas()
    return dados, 200

def listar_tema_por_id(id):
    row = buscar_tema_por_id(id)
    if row is None:
        return {"erro": "Tema não encontrado."}, 404
    return dict(row), 200

def editar_tema(id, payload):
    campos = []
    valores = []
    for campo in ["usuario_id", "assunto_id", "titulo"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())
    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400
    try:
        linhas = atualizar_tema(id, campos, valores)
        if linhas == 0:
            return {"erro": "Tema não encontrado."}, 404
        return {"mensagem": "Tema atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500

def deletar_tema(id):
    try:
        linhas = excluir_tema(id)
        if linhas == 0:
            return {"erro": "Tema não encontrado."}, 404
        return {"mensagem": "Tema excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
