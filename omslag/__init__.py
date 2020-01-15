from flask import Flask
from flask_login import LoginManager

login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    login_manager.init_app(app)
    app.secret_key = 'super secret string'  # TODO Change this!

    from .routes import routes as routes_blueprint
    app.register_blueprint(routes_blueprint)

    return app
