from flask import Blueprint, render_template

site_blueprint = Blueprint('comic', __name__)


@site_blueprint.route('/', defaults={'path': ''})
@site_blueprint.route('/<path:path>')
def comic(path):
    return render_template("comic.html")


@site_blueprint.route("/")
def home():
    return render_template("home.html")


@site_blueprint.route("/start")
def comic_start():
    return render_template("comic_start.html")


@site_blueprint.route("/pattern/<mood>/")
def pattern(mood):
    return render_template("pattern.html")


@site_blueprint.route("/about")
def about():
    return render_template("about.html")


