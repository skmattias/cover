import flask
from flask import render_template
from flask import Blueprint
from omslag.models import DatabaseUser, User
import flask_login
import sys


routes = Blueprint('routes', __name__)


# Main page.
@routes.route('/')
@flask_login.login_required
def index():
    return render_template('index.html')

# Login page.
@routes.route('/login', methods=['GET', 'POST'])
def login():
    # GET
    if flask.request.method == 'GET':
        return render_template('login.html')

    # POST
    user_name = flask.request.form['user_name']
    db_user = DatabaseUser(user_name)

    # User doesn't exist.
    if not db_user.exists:
        return {'success': False}

    # Wrong password.
    if not db_user.check_password(flask.request.form['password']):
        return {'success': False}

    # Login successful.
    user = User()
    user.id = user_name
    flask_login.login_user(user)
    return {'success': True, 'redirect': flask.url_for('routes.index')}


# Logout URL.
@routes.route('/logout')
def logout():
    flask_login.logout_user()
    return flask.redirect(flask.url_for('routes.login'))
