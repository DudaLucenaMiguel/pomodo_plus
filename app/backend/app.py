from flask import Flask
from flask_cors import CORS
from routes.usuarioRoutes import usuario_bp
from routes.cicloRoutes import ciclo_bp
from routes.sessaoRoutes import sessao_bp
from routes.assuntoRoutes import assunto_bp
from routes.temaRoutes import tema_bp
from routes.loginRoutes import login_bp
from routes.cadastroRoutes import cadastro_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(usuario_bp)
app.register_blueprint(ciclo_bp)
app.register_blueprint(sessao_bp)
app.register_blueprint(assunto_bp)
app.register_blueprint(tema_bp)
app.register_blueprint(login_bp)
app.register_blueprint(cadastro_bp)

if __name__ == "__main__":
    app.run(debug=True)
