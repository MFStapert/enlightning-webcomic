import os
from flask import Flask
from flask_cors import CORS


def create_app():
    # Instantiate
    app = Flask(__name__, static_url_path="/static")

    # CORS
    CORS(app)

    # Settings
    app_settings = os.getenv("APP_SETTINGS")
    app.config.from_object(app_settings)

    # Routes
    from proj.site.site import site_blueprint
    app.register_blueprint(site_blueprint)
    from proj.api.api import api_blueprint
    app.register_blueprint(api_blueprint)

    return app
