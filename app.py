from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from pathlib import Path

DB_PATH = Path("users.db")

app = Flask(__name__)

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                senha_hash TEXT NOT NULL
            );
        """)
        conn.commit()

@app.post("/register")
def register():
    data = request.get_json(silent=True) or {}
    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")

    # validações mínimas
    if not nome or not email or not senha:
        return jsonify({"error": "Campos obrigatórios: nome, email, senha"}), 400
    if "@" not in email:
        return jsonify({"error": "Email inválido"}), 400
    if len(senha) < 6:
        return jsonify({"error": "Senha deve ter pelo menos 6 caracteres"}), 400

    senha_hash = generate_password_hash(senha)

    try:
        with sqlite3.connect(DB_PATH) as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO users (nome, email, senha_hash) VALUES (?, ?, ?)",
                (nome, email, senha_hash)
            )
            user_id = cur.lastrowid
            conn.commit()
    except sqlite3.IntegrityError:
        # UNIQUE(email) violado
        return jsonify({"error": "Email já cadastrado"}), 409

    return jsonify({
        "message": "Usuário registrado com sucesso!",
        "user": {"id": user_id, "nome": nome, "email": email}
    }), 201

@app.get("/users")
def list_users():
    with sqlite3.connect(DB_PATH) as conn:
        cur = conn.cursor()
        cur.execute("SELECT id, nome, email FROM users ORDER BY id DESC;")
        rows = cur.fetchall()
    users = [{"id": r[0], "nome": r[1], "email": r[2]} for r in rows]
    return jsonify(users), 200

@app.get("/health")
def health():
    return {"status": "ok"}, 200

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
