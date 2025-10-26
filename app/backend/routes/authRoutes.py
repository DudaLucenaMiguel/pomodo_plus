from flask import Blueprint, jsonify, request
from controllers.authControllers import cadastrar_usuario, login_usuario

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/cadastro", methods=["POST"])
def post_cadastro():
    payload = request.get_json(silent=True) or {}
    body, status = cadastrar_usuario(payload)
    return jsonify(body), status

@auth_bp.route("/login", methods=["POST"])
def post_login():
    payload = request.get_json(silent=True) or {}
    body, status = login_usuario(payload)
    return jsonify(body), status
