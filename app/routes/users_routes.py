# app/routes/users_routes.py
from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.controllers.users_controller import create_user, list_users, get_user_by_id

bp_users = Blueprint("users", __name__, url_prefix="/users")

def get_db() -> Session:
    return SessionLocal()

@bp_users.post("")
def route_create_user():
    """
    POST /users
    body:
    {
      "username": "duda",
      "email": "duda@example.com",
      "password": "minhasenha",
      "full_name": "Duda Lucena"  # opcional
    }
    """
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip()
    password = (data.get("password") or "").strip()
    full_name = data.get("full_name")

    if not username or not email or not password:
        return jsonify({"detail": "username, email e password são obrigatórios"}), 400

    db = get_db()
    try:
        user = create_user(db, username=username, email=email, password=password, full_name=full_name)
        return jsonify(user.to_dict()), 201
    except ValueError as e:
        db.rollback()
        return jsonify({"detail": str(e)}), 400
    finally:
        db.close()

@bp_users.get("")
def route_list_users():
    """GET /users"""
    db = get_db()
    try:
        users = list_users(db)
        return jsonify([u.to_dict() for u in users])
    finally:
        db.close()

@bp_users.get("/<int:user_id>")
def route_get_user(user_id: int):
    """GET /users/{user_id}"""
    db = get_db()
    try:
        user = get_user_by_id(db, user_id)
        if not user:
            return jsonify({"detail": "usuário não encontrado"}), 404
        return jsonify(user.to_dict())
    finally:
        db.close()
