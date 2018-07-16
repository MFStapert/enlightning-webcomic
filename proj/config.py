class BaseConfig:
    DEBUG = False
    SECRET_KEY = "webcomic"


class DevelopmentConfig(BaseConfig):
    DEBUG = True

