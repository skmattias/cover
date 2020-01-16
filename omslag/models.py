import pymysql
from werkzeug.security import generate_password_hash, check_password_hash
import flask
import flask_login
from omslag import login_manager

# Login manager stuff.
@login_manager.user_loader
def load_user(user_name):
    db_user = DatabaseUser(user_name)

    if not db_user.exists:
        return

    user = User()
    user.id = user_name
    return user


@login_manager.request_loader
def request_loader(request):
    user_name = request.form.get('user_name')
    db_user = DatabaseUser(user_name)

    if not db_user.exists:
        return

    user = User()
    user.id = user_name
    user.is_authenticated = \
        db_user.check_password(flask.request.form['password'])

    return user


@login_manager.unauthorized_handler
def unauthorized_handler():
    return flask.redirect(flask.url_for('routes.login'))


# Flask user class used for login. All required properties are already
# implemeted in UserMixin.
class User(flask_login.UserMixin):
    pass


# Database user class mainly to check passwords at login.
class DatabaseUser:
    def __init__(self, user_name):
        from omslag.config import Config

        host = Config.DB_HOST
        user = Config.DB_USER
        password = Config.DB_PASSWORD
        db = Config.DB_NAME

        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            db=db,
            cursorclass=pymysql.cursors.DictCursor)

        self.user_name = user_name
        try:
            with connection.cursor() as cursor:
                query = \
                    f"""
                    SELECT pw_hash
                    FROM omslag_user
                    WHERE user_name = '{user_name}';
                """
                cursor.execute(query)
                res = cursor.fetchone()

                if res is None:
                    self.exists = False
                else:
                    self.exists = True
                    self.password_hash = res['pw_hash']

        finally:
            connection.close()

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
