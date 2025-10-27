from flask import Blueprint, jsonify, request
from controllers.temaControllers import (
   criar_tema,
   listar_temas,
   listar_tema_por_id,
   editar_tema,
   deletar_tema
)

tema_bp = Blueprint("tema_bp", __name__)

@tema_bp.route("/tema", methods=["POST"])
def post_tema():
    payload = request.get_json(silent=True) or {}
    body, status = criar_tema(payload)
    return jsonify(body), status


@tema_bp.route("/tema", methods=["GET"])
def get_tema():
    body, status = listar_temas()
    return jsonify(body), status


@tema_bp.route("/tema/<int:id>", methods=["GET"])
def get_tema_por_id(id):
    body, status = listar_tema_por_id(id)
    return jsonify(body), status


@tema_bp.route("/tema/<int:id>", methods=["PUT"])
def put_tema(id):
    payload = request.get_json(silent=True) or {}
    body, status = editar_tema(id, payload)
    return jsonify(body), status


@tema_bp.route("/tema/<int:id>", methods=["DELETE"])
def delete_tema(id):
    body, status = deletar_tema(id)
    return jsonify(body), status
