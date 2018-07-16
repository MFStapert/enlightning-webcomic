from enum import Enum
from flask import jsonify


class PanelType(Enum):
    default = 0
    choice = 1
    pattern = 2


class ComicModel:
    character = None
    panel_url = None
    panel_title = None
    previous_panel_url = None
    original_character = True

    def to_json(self):
        raise NotImplementedError()


class PanelModel(ComicModel):
    panel_img = None
    next_panel_url = None
    animations = None
    show_first_animation = False
    has_animations = False
    has_pattern = False

    def to_json(self):
        return jsonify(character=self.character,
                       panel_url=self.panel_url,
                       panel_img=self.panel_img,
                       previous_panel_url=self.previous_panel_url,
                       next_panel_url=self.next_panel_url,
                       panel_title=self.panel_title,
                       show_first_animation=self.show_first_animation,
                       has_pattern=self.has_pattern,
                       has_animations=self.has_animations,
                       animations=self.animations,
                       type=PanelType.default.name,
                       original_character=self.original_character)


class ChoiceModel(ComicModel):
    panel_left_img = None
    panel_right_img = None
    choice_left_img = None
    choice_right_img = None
    choice_left_url = None
    choice_right_url = None

    def to_json(self):
        return jsonify(character=self.character,
                       panel_url=self.panel_url,
                       panel_title=self.panel_title,
                       previous_panel_url=self.previous_panel_url,
                       panel_left_img=self.panel_left_img,
                       panel_right_img=self.panel_right_img,
                       choice_left_img=self.choice_left_img,
                       choice_right_img=self.choice_right_img,
                       choice_left_url=self.choice_left_url,
                       choice_right_url=self.choice_right_url,
                       type=PanelType.choice.name,
                       original_character = self.original_character)
