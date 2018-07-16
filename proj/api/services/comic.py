from pony.orm import db_session

from proj.db.dao import ComicDao
from proj.db.entities import AnimationType

from proj.api.models import PanelModel, ChoiceModel
from proj.api.utils import nr_of_objects_in_dir


class BaseService:

    def __init__(self, character_name="none", panel_id=0, choice_id=0, other_character_name="none"):
        self.character_name = character_name
        self.panel_id = panel_id
        self.choice_id = choice_id
        self.other_character_name = other_character_name
        self.original_character = True

    @db_session
    def get_model(self):
        model = PanelModel()

        model.character = self.get_character_name()

        if self.get_previous_panel_url() is not None:
            model.previous_panel_url = self.get_previous_panel_url()
        if self.get_next_panel_url() is not None:
            model.next_panel_url = self.get_next_panel_url()

        model.panel_url = self.get_panel_url()
        model.panel_img = self.get_panel_img()
        model.panel_title = self.get_panel_title()
        model.original_character = self.original_character

        db_panel = ComicDao.get_panel(model.panel_img)

        if db_panel and db_panel.show_first_animation:
            model.show_first_animation = db_panel.show_first_animation

        if db_panel and db_panel.pattern:
            model.has_pattern = True
            model.pattern_coords = {"x": db_panel.pattern.x, "y": db_panel.pattern.y}
            model.pattern_scale = db_panel.pattern.scale

        panel_location = "./proj" + self.get_panel_img().replace("panel.png", "")
        if nr_of_objects_in_dir(panel_location) > 1:
            animations = []
            for i in range(nr_of_objects_in_dir(panel_location + "text/")):
                animation_location = str(panel_location + "text/" + str(i + 1) + ".png").replace("./proj", "")
                if db_panel and db_panel.animations and i in db_panel.animations.nr:
                    for animation in db_panel.animations:
                        if animation.nr is i:
                            animations.append({"location": animation_location,
                                               "animation_type": animation.animation_type.name})
                else:
                    animations.append({"location": animation_location, "animation_type": AnimationType.default.name})
            model.has_animations = True
            model.animations = animations

        return model

    def get_character_name(self):
        return self.character_name

    def get_panel_url(self):
        raise NotImplementedError()

    def get_panel_img(self):
        raise NotImplementedError()

    def get_panel_title(self):
        raise NotImplementedError()

    def get_previous_panel_url(self):
        raise NotImplementedError()

    def get_next_panel_url(self):
        raise NotImplementedError()


class IntroService(BaseService):

    def get_panel_img(self):
        return "/static/img/comic/{0}/intro/{1}/panel.png".format(self.character_name, str(self.panel_id))

    def get_panel_title(self):
        return "{0}'s intro (panel:{1})".format(self.character_name.title(), str(self.panel_id))

    def get_panel_url(self):
        return "/api/{0}/intro/{1}/".format(self.character_name, str(self.panel_id))

    def get_previous_panel_url(self):
        if self.panel_id == 1:
            return None
        else:
            return "/api/{0}/intro/{1}/".format(self.character_name, str(self.panel_id-1))

    def get_next_panel_url(self):
        if self.is_last_panel():
            return "/api/{0}/choice/".format(self.character_name)
        else:
            return "/api/{0}/intro/{1}/".format(self.character_name, str(self.panel_id+1))

    def is_last_panel(self):
        if nr_of_objects_in_dir("./proj/static/img/comic/{0}/intro/".format(self.character_name)) is self.panel_id:
            return True
        return False


class ChoiceMomentService(BaseService):

    def get_model(self):
        model = ChoiceModel()

        model.character = self.character_name
        model.panel_url = self.get_panel_url()
        model.previous_panel_url = self.get_previous_panel_url()
        model.panel_left_img = self.get_left_panel_img()
        model.panel_right_img = self.get_right_panel_img()
        model.panel_title = self.get_panel_title()

        model.choice_left_img = "/static/img/comic/{0}/choices/choice_left.png".format(self.character_name)
        model.choice_right_img = "/static/img/comic/{0}/choices/choice_right.png".format(self.character_name)
        model.choice_left_url = "/api/{0}/choice/1/1/".format(self.character_name)
        model.choice_right_url = "/api/{0}/choice/2/1/".format(self.character_name)

        return model

    def get_panel_img(self):
        raise NotImplementedError()

    def get_left_panel_img(self):
        return "/static/img/comic/{0}/choices/panel_left.png".format(self.character_name)

    def get_right_panel_img(self):
        return "/static/img/comic/{0}/choices/panel_right.png".format(self.character_name)

    def get_panel_title(self):
        return self.character_name.title() + "'s keuze moment"

    def get_panel_url(self):
        return "/api/{0}/choice/".format(self.character_name)

    def get_previous_panel_url(self):
        prev_panel_id = str(nr_of_objects_in_dir("./proj/static/img/comic/{0}/intro/".format(self.character_name)))
        return "/api/{0}/intro/{1}/".format(self.character_name, prev_panel_id)

    def get_next_panel_url(self):
        raise NotImplementedError()


class CharacterChoiceService(BaseService):

    def get_panel_img(self):
        return "/static/img/comic/{0}/{1}/{2}/panel.png"\
            .format(self.character_name, str(self.choice_id), str(self.panel_id))

    def get_panel_title(self):
        return "{0}'s keuze (keuze: {1} panel: {2})"\
            .format(self.character_name.title(), str(self.choice_id), str(self.panel_id))

    def get_panel_url(self):
        return "/api/{0}/choice/{1}/{2}/".format(self.character_name, str(self.choice_id), str(self.panel_id))

    def get_previous_panel_url(self):
        if self.panel_id == 1:
            return "/api/{0}/choice/".format(self.character_name)
        else:
            return "/api/{0}/choice/{1}/{2}/".format(self.character_name, str(self.choice_id), str(self.panel_id-1))

    def get_next_panel_url(self):
        if self.is_last_panel():
            return "/api/{0}/choice/{1}/{2}/1/"\
                .format(self.character_name, str(self.choice_id), self.other_character_name)
        else:
            return "/api/{0}/choice/{1}/{2}/"\
                .format(self.character_name, str(self.choice_id), str(self.panel_id+1))

    def is_last_panel(self):
        path = "./proj/static/img/comic/{0}/{1}/".format(self.character_name, str(self.choice_id))
        panels = nr_of_objects_in_dir(path)
        if self.panel_id == panels:
            return True
        return False


class OtherCharacterService(BaseService):

    def __init__(self, character_name, panel_id, choice_id, other_character_name):
        super(OtherCharacterService, self).__init__(character_name, panel_id, choice_id, other_character_name)
        self.original_character = False

    def get_character_name(self):
        return self.other_character_name

    def get_panel_img(self):
        return "/static/img/comic/after/{0}/{1}/{2}/panel.png"\
            .format(str(self.choice_id), self.other_character_name, str(self.panel_id))

    def get_panel_title(self):
        return "{0}'s verhaal (vorig karakter: {1}, keuze: {2}, panel: {3})" \
               .format(self.other_character_name.title(), self.character_name.title(),
                       str(self.choice_id), str(self.panel_id))

    def get_panel_url(self):
        return "/api/{0}/choice/{1}/{2}/{3}/" \
            .format(self.character_name, str(self.choice_id), self.other_character_name, str(self.panel_id ))

    def get_previous_panel_url(self):
        if self.panel_id == 1:
            path = str("./proj/static/img/comic/{0}/{1}/").format(self.character_name, str(self.choice_id))
            prev_panel_id = nr_of_objects_in_dir(path)
            return "/api/{0}/choice/{1}/{2}/".format(self.character_name, str(self.choice_id), str(prev_panel_id))
        else:
            return "/api/{0}/choice/{1}/{2}/{3}/" \
                   .format(self.character_name, str(self.choice_id), self.other_character_name, str(self.panel_id-1))

    def get_next_panel_url(self):
        if self.is_last_panel():
            return None
        else:
            return "/api/{0}/choice/{1}/{2}/{3}/" \
                .format(self.character_name, str(self.choice_id), self.other_character_name, str(self.panel_id+1))

    def is_last_panel(self):
        path = "./proj/static/img/comic/after/{0}/{1}/".format(str(self.choice_id), self.other_character_name)
        if nr_of_objects_in_dir(path) == self.panel_id:
            return True
        return False
