from models.sessaoModel import (
    inserir_sessao,
    buscar_todas_sessoes,
    buscar_sessoes_por_usuario,
    buscar_sessao_por_id,
    atualizar_sessao,
    excluir_sessao,
)

def _to_int_or_none(v):
    if v is None or v == "":
        return None
    try:
        return int(v)
    except Exception:
        return None

def criar_sessao(payload):
    usuario_id = _to_int_or_none(payload.get("usuario_id"))
    ciclo_id   = _to_int_or_none(payload.get("ciclo_id"))
    assunto_id = _to_int_or_none(payload.get("assunto_id"))
    tema_id    = _to_int_or_none(payload.get("tema_id"))
    inicio     = (payload.get("inicio") or "").strip()
    fim        = (payload.get("fim") or "").strip()
    status     = (payload.get("status") or "completed").strip()

    if not usuario_id or not inicio:
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
        if campo in payload:
            v = payload[campo]
            if v is None or v == "":
                continue
            if campo in ("usuario_id", "ciclo_id", "assunto_id", "tema_id"):
                v = _to_int_or_none(v)
                if v is None:
                    continue
            if isinstance(v, str):
                v = v.strip()
            campos.append(f"{campo} = ?")
            valores.append(v)
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
