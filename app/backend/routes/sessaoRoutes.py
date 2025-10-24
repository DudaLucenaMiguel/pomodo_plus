from flask import Blueprint, jsonify, request
from controllers.sessaoControllers import (
   criar_sessao,
   listar_sessoes,
   listar_sessao_por_id,
   editar_sessao,
   deletar_sessao
)

sessao_bp = Blueprint("sessao_bp", __name__)

@sessao_bp.route("/sessao", methods=["POST"])
def post_sessao():
    payload = request.get_json(silent=True) or {}
    body, status = criar_sessao(payload)
    return jsonify(body), status


@sessao_bp.route("/sessao", methods=["GET"])
def get_sessao():
    body, status = listar_sessoes()
    return jsonify(body), status


@sessao_bp.route("/sessao/<int:id>", methods=["GET"])
def get_sessao_por_id(id):
    body, status = listar_sessao_por_id(id)
    return jsonify(body), status


@sessao_bp.route("/sessao/<int:id>", methods=["PUT"])
def put_sessao(id):
    payload = request.get_json(silent=True) or {}
    body, status = editar_sessao(id, payload)
    return jsonify(body), status


@sessao_bp.route("/sessao/<int:id>", methods=["DELETE"])
def delete_sessao(id):
    body, status = deletar_sessao(id)
    return jsonify(body), status
