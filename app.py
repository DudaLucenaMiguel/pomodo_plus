from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
import uuid

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Simulação de base de dados em memória
users_db = []

@app.route("/users/register", methods=["POST"])
def register_user():
    """
    Endpoint para registrar usuários.
    Espera: JSON com "username", "email" e "password".
    """
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Validações simples
    if not username or not email or not password:
        return jsonify({"error": "username, email e password são obrigatórios"}), 400

    # Verifica duplicidade
    for user in users_db:
        if user["email"] == email:
            return jsonify({"error": "Email já cadastrado"}), 409

    # Hash da senha
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = {
        "id": str(uuid.uuid4()),
        "username": username,
        "email": email,
        "password": hashed_password  # Não armazene senha sem hash!
    }
    users_db.append(new_user)

    return jsonify({"message": "Usuário registrado com sucesso!", "user": new_user}), 201

@app.route("/users", methods=["GET"])
def list_users():
    """
    Endpoint para listar usuários.
    Retorna as informações sem expor a senha.
    """
    users_sanitized = [
        {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"]
        }
        for user in users_db
    ]
    return jsonify(users_sanitized), 200

if __name__ == "__main__":
    app.run(debug=True)
