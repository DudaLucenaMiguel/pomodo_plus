from flask import Blueprint, jsonify, request

from controllers.loginControllers import realizar_login


login_bp = Blueprint("login_bp", __name__)


@login_bp.route("/login", methods=["POST"])
def post_login():
    payload = request.get_json(silent=True) or {}
    body, status = realizar_login(payload)
    return jsonify(body), status
