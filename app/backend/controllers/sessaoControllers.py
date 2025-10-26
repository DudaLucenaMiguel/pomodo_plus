from models.sessaoModel import (
    inserir_sessao,
    buscar_todas_sessoes,
    buscar_sessoes_por_usuario,
    buscar_sessao_por_id,
    atualizar_sessao,
    excluir_sessao,
)

def criar_sessao(payload):
    usuario_id = (payload.get("usuario_id") or "")
    ciclo_id = (payload.get("ciclo_id") or "")
    assunto_id = (payload.get("assunto_id") or "")
    tema_id = (payload.get("tema_id") or "")
    inicio = (payload.get("inicio") or "")
    fim = (payload.get("fim") or "")
    status = (payload.get("status") or "")
    if not usuario_id or not ciclo_id or not inicio or not status:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400
    try:
        novo_id = inserir_sessao(usuario_id, ciclo_id, assunto_id, tema_id, inicio, fim, status)
        return {"mensagem": "Sessão criada com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500

def listar_sessoes():
    dados = buscar_todas_sessoes()
    return dados, 200

def listar_sessoes_por_usuario(usuario_id):
    dados = buscar_sessoes_por_usuario(usuario_id)
    return dados, 200

def listar_sessao_por_id(id):
    row = buscar_sessao_por_id(id)
    if row is None:
        return {"erro": "Sessão não encontrada."}, 404
    return dict(row), 200

def editar_sessao(id, payload):
    campos = []
    valores = []
    for campo in ["usuario_id", "ciclo_id", "assunto_id", "tema_id", "inicio", "fim", "status"]:
        if campo in payload and payload[campo]:
            campos.append(f"{campo} = ?")
            valores.append(payload[campo].strip())
    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400
    try:
        linhas = atualizar_sessao(id, campos, valores)
        if linhas == 0:
            return {"erro": "Sessão não encontrada."}, 404
        return {"mensagem": "Sessão atualizada com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500

def deletar_sessao(id):
    try:
        linhas = excluir_sessao(id)
        if linhas == 0:
            return {"erro": "Sessão não encontrada."}, 404
        return {"mensagem": "Sessão excluída com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
