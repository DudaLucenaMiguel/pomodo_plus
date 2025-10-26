from flask import Blueprint, jsonify, request

from controllers.cadastroControllers import realizar_cadastro


cadastro_bp = Blueprint("cadastro_bp", __name__)


@cadastro_bp.route("/cadastro", methods=["POST"])
def post_cadastro():
    payload = request.get_json(silent=True) or {}
    body, status = realizar_cadastro(payload)
    return jsonify(body), status
