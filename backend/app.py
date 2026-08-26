from flask import Flask
from flask_cors import CORS

from config.config import DATABASE_CONNECTION_URI
from models.db import db
from models.user import User
from routes.auth_routes import auth_routes


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_CONNECTION_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(auth_routes, url_prefix="/api/auth")


@app.route("/")
def home():
    return "Backend de Sabikids funcionando"


@app.route("/test-db")
def test_db():
    try:
        db.engine.connect()
        return "Conexion a MySQL exitosa"
    except Exception as e:
        return f"Error de conexion: {e}", 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Tablas creadas correctamente")

    app.run(debug=True)