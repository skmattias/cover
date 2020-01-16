import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_APP = os.environ.get('FLASK_APP')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')

    DB_HOST = os.environ.get('OMSLAG_DB_HOST')
    DB_USER = os.environ.get('OMSLAG_DB_USER')
    DB_PASSWORD = os.environ.get('OMSLAG_DB_PASSWORD')
    DB_NAME = os.environ.get('OMSLAG_DB_NAME')
