from flask import Blueprint, jsonify, request
from controllers.assuntoControllers import (
   criar_assunto,
   listar_assunto,
   listar_assunto_por_id,
   editar_assunto,
   deletar_assunto
)

assunto_bp = Blueprint("assunto_bp", __name__)

@assunto_bp.route("/assunto", methods=["POST"])
def post_assunto():
    payload = request.get_json(silent=True) or {}
    body, status = criar_assunto(payload)
    return jsonify(body), status


@assunto_bp.route("/assunto", methods=["GET"])
def get_assunto():
    body, status = listar_assunto()
    return jsonify(body), status


@assunto_bp.route("/assunto/<int:id>", methods=["GET"])
def get_assunto_por_id(id):
    body, status = listar_assunto_por_id(id)
    return jsonify(body), status


@assunto_bp.route("/assunto/<int:id>", methods=["PUT"])
def put_assunto(id):
    payload = request.get_json(silent=True) or {}
    body, status = editar_assunto(id, payload)
    return jsonify(body), status


@assunto_bp.route("/assunto/<int:id>", methods=["DELETE"])
def delete_assunto(id):
    body, status = deletar_assunto(id)
    return jsonify(body), status
