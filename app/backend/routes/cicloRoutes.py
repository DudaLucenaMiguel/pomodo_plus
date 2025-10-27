from flask import Blueprint, jsonify, request
from controllers.cicloControllers import (
   criar_ciclo,
   listar_ciclos,
   listar_ciclos_por_usuario,
   listar_ciclos_por_id,
   editar_ciclo,
   deletar_ciclo
)

ciclo_bp = Blueprint("ciclo_bp", __name__)

@ciclo_bp.route("/ciclo", methods=["POST"])
def post_ciclo():
    payload = request.get_json(silent=True) or {}
    body, status = criar_ciclo(payload)
    return jsonify(body), status

@ciclo_bp.route("/ciclo", methods=["GET"])
def get_ciclo():
    body, status = listar_ciclos()
    return jsonify(body), status

@ciclo_bp.route("/ciclo/usuario/<int:usuario_id>", methods=["GET"])
def get_ciclo_por_usuario(usuario_id):
    body, status = listar_ciclos_por_usuario(usuario_id)
    return jsonify(body), status

@ciclo_bp.route("/ciclo/<int:id>", methods=["GET"])
def get_ciclo_por_id(id):
    body, status = listar_ciclos_por_id(id)
    return jsonify(body), status

@ciclo_bp.route("/ciclo/<int:id>", methods=["PUT"])
def put_ciclo(id):
    payload = request.get_json(silent=True) or {}
    body, status = editar_ciclo(id, payload)
    return jsonify(body), status

@ciclo_bp.route("/ciclo/<int:id>", methods=["DELETE"])
def delete_ciclo(id):
    body, status = deletar_ciclo(id)
    return jsonify(body), status
