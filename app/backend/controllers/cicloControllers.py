from models.cicloModel import (
    inserir_ciclo,
    buscar_todos_ciclos,
    buscar_ciclos_por_usuario,
    buscar_ciclo_por_id,
    atualizar_ciclo,
    excluir_ciclo,
)

def criar_ciclo(payload):
    usuario_id = payload.get("usuario_id")
    tempo_estudo = payload.get("tempo_estudo")
    tempo_descanso = payload.get("tempo_descanso")
    tempo_entre_ciclos = payload.get("tempo_entre_ciclos")
    repeticoes = payload.get("repeticoes")
    nome = (payload.get("nome") or "").strip()

    if not usuario_id or tempo_estudo is None or tempo_descanso is None or tempo_entre_ciclos is None:
        return {"erro": "Campos obrigatórios não preenchidos."}, 400

    try:
        novo_id = inserir_ciclo(usuario_id, tempo_estudo, tempo_descanso, tempo_entre_ciclos, repeticoes, nome if nome else None)
        return {"mensagem": "Ciclo criado com sucesso.", "id": novo_id}, 201
    except Exception as e:
        return {"erro": str(e)}, 500

def listar_ciclos():
    dados = buscar_todos_ciclos()
    return dados, 200

def listar_ciclos_por_usuario(usuario_id):
    dados = buscar_ciclos_por_usuario(usuario_id)
    return dados, 200

def listar_ciclos_por_id(id):
    row = buscar_ciclo_por_id(id)
    if row is None:
        return {"erro": "Ciclo não encontrado."}, 404
    return dict(row), 200

def editar_ciclo(id, payload):
    campos = []
    valores = []
    for campo in ["usuario_id", "tempo_estudo", "tempo_descanso", "tempo_entre_ciclos", "repeticoes", "nome"]:
        if campo in payload and payload[campo] is not None:
            valor = payload[campo]
            if isinstance(valor, str):
                valor = valor.strip()
            if valor == "":
                continue
            campos.append(f"{campo} = ?")
            valores.append(valor)

    if not campos:
        return {"erro": "Nenhum campo válido enviado para atualização."}, 400

    try:
        linhas = atualizar_ciclo(id, campos, valores)
        if linhas == 0:
            return {"erro": "Ciclo não encontrado."}, 404
        return {"mensagem": "Ciclo atualizado com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500

def deletar_ciclo(id):
    try:
        linhas = excluir_ciclo(id)
        if linhas == 0:
            return {"erro": "Ciclo não encontrado."}, 404
        return {"mensagem": "Ciclo excluído com sucesso."}, 200
    except Exception as e:
        return {"erro": str(e)}, 500
