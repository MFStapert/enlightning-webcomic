import random

from flask import Blueprint, session

from proj.api.services.comic import IntroService, ChoiceMomentService, CharacterChoiceService, OtherCharacterService


api_blueprint = Blueprint('comic_api', __name__)


@api_blueprint.route("/api/<string:character_name>/intro/")
def intro_start(character_name):
    if "other_character_name" in session:
        session.pop("other_character_name")
    service = IntroService(character_name, 1)
    return service.get_model().to_json()


@api_blueprint.route("/api/<string:character_name>/intro/<int:panel_id>/")
def intro(character_name, panel_id):
    service = IntroService(character_name, panel_id)
    return service.get_model().to_json()


@api_blueprint.route("/api/<string:character_name>/choice/")
def character_choice_moment(character_name):
    service = ChoiceMomentService(character_name)
    return service.get_model().to_json()


@api_blueprint.route("/api/<string:character_name>/choice/<int:choice_id>/<int:panel_id>/")
def character_choice_route(character_name, choice_id, panel_id):
    if "other_character_name" not in session:
        characters = ["clarice", "daria", "mateusz"]
        characters.remove(character_name)
        session["other_character_name"] = random.choice(characters)
    service = CharacterChoiceService(character_name, panel_id, choice_id, session["other_character_name"])
    return service.get_model().to_json()


@api_blueprint.route("/api/<string:character_name>/choice/<int:choice_id>/<string:other_character_name>/<int:panel_id>/")
def other_character_story(character_name, choice_id, other_character_name, panel_id):
    service = OtherCharacterService(character_name, panel_id, choice_id, other_character_name)
    return service.get_model().to_json()
