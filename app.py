from proj import create_app
from proj.config import DevelopmentConfig


app = create_app()


if __name__ == "__main__":
    app.config.from_object(DevelopmentConfig)
    app.run(threaded=True)
