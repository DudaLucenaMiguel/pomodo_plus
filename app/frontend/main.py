# app/main.py
from flask import Flask
from app.database import engine, Base
from app.routes.users_routes import bp_users

def create_app() -> Flask:
    app = Flask(__name__)

    # cria as tabelas no primeiro start (se não existirem)
    Base.metadata.create_all(bind=engine)

    # rota simples de saúde
    @app.get("/health")
    def health():
        return {"status": "ok"}

    # registra o blueprint de users
    app.register_blueprint(bp_users)
    return app

if __name__ == "__main__":
    # executa: python -m app.main  (a partir da pasta pomodoro_api/)
    app = create_app()
    app.run(debug=True)
