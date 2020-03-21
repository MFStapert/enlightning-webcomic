import os
from flask import Flask
from flask_cors import CORS

class BaseConfig:
    DEBUG = False
    SECRET_KEY = "webcomic"
    PORT = 8080

class DevelopmentConfig(BaseConfig):
    DEBUG = True

def create_app():
    # Instantiate
    app = Flask(__name__, static_url_path="/static")

    # CORS
    CORS(app)

    # Settings    
    app.config.from_object(BaseConfig)

    # Routes
    from proj.site.site import site_blueprint
    app.register_blueprint(site_blueprint)
    from proj.api.api import api_blueprint
    app.register_blueprint(api_blueprint)

    return app
