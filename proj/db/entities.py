from enum import Enum
from pony.orm import *

from proj.db.utils import EnumConverter

db = Database()

db.bind(provider="sqlite", filename="db.sqlite", create_db=True)
db.provider.converter_classes.append((Enum, EnumConverter))


class AnimationType(Enum):
    default = 0
    flash = 1


class Panel(db.Entity):
    panel_url = Required(str, unique=True)
    show_first_animation = Optional(bool)
    pattern = Optional("Pattern")
    animations = Set("Animation")


class Pattern(db.Entity):
    panel = Required(Panel)
    x = Required(int)
    y = Required(int)
    scale = Required(int)


class Animation(db.Entity):
    panel = Required(Panel)
    nr = Required(int)
    animation_type = Optional(AnimationType)


db.generate_mapping(create_tables=True)
