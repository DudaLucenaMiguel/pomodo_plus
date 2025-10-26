from flask import Blueprint, jsonify, request
from controllers.usuarioControllers import (
    criar_usuario,
    listar_usuarios,
    listar_usuario_por_id,
    autenticar_usuario,
    editar_usuario,
    deletar_usuario,
)

usuario_bp = Blueprint("usuario_bp", __name__)

@usuario_bp.route("/usuario", methods=["POST"])
def post_usuario():
    payload = request.get_json(silent=True) or {}
    body, status = criar_usuario(payload)
    return jsonify(body), status


@usuario_bp.route("/usuario", methods=["GET"])
def get_usuario():
    body, status = listar_usuarios()
    return jsonify(body), status


@usuario_bp.route("/usuario/<int:id>", methods=["GET"])
def get_usuario_por_id(id):
    body, status = listar_usuario_por_id(id)
    return jsonify(body), status


@usuario_bp.route("/usuario/login", methods=["POST"])
def post_login_usuario():
    payload = request.get_json(silent=True) or {}
    body, status = autenticar_usuario(payload)
    return jsonify(body), status


@usuario_bp.route("/usuario/<int:id>", methods=["PUT"])
def put_usuario(id):
    payload = request.get_json(silent=True) or {}
    body, status = editar_usuario(id, payload)
    return jsonify(body), status


@usuario_bp.route("/usuario/<int:id>", methods=["DELETE"])
def delete_usuario(id):
    body, status = deletar_usuario(id)
    return jsonify(body), status
