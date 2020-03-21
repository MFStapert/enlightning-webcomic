from pony.orm import db_session
from proj.db.entities import db, Panel, Pattern, Animation, AnimationType


def populate():
    db.drop_all_tables(with_all_data=True)
    db.create_tables()
    with db_session:
        # Mateusz
        m_intro_3 = Panel(panel_url="/static/img/comic/mateusz/intro/3/panel.png")
        Animation(panel=m_intro_3, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/mateusz/intro/8/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/mateusz/1/1/panel.png", show_first_animation=True)

        m_choice_1_3 = Panel(panel_url="/static/img/comic/mateusz/1/3/panel.png", show_first_animation=True)
        Animation(panel=m_choice_1_3, nr=1, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/mateusz/1/4/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/mateusz/1/5/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/mateusz/1/8/panel.png", show_first_animation=True)

        m_choice_1_9 = Panel(panel_url="/static/img/comic/mateusz/1/9/panel.png", show_first_animation=True)
        Pattern(panel=m_choice_1_9, x=0, y=0, scale=1)

        m_choice_2_1 = Panel(panel_url="/static/img/comic/mateusz/2/1/panel.png")
        Animation(panel=m_choice_2_1, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/mateusz/2/2/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/mateusz/2/3/panel.png", show_first_animation=True)

        m_choice_2_5 = Panel(panel_url="/static/img/comic/mateusz/2/5/panel.png", show_first_animation=True)
        Animation(panel=m_choice_2_5, nr=1, animation_type=AnimationType.flash)

        m_choice_2_8 = Panel(panel_url="/static/img/comic/mateusz/2/8/panel.png")
        Pattern(panel=m_choice_2_8, x=0, y=0, scale=1)

        # Mateusz - after
        m_a_choice_1_1 = Panel(panel_url="/static/img/comic/after/1/mateusz/1/panel.png", show_first_animation=True)
        Animation(panel=m_a_choice_1_1, nr=1, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/after/1/mateusz/2/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/after/1/mateusz/3/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/after/1/mateusz/6/panel.png", show_first_animation=True)

        m_a_choice_1_7 = Panel(panel_url="/static/img/comic/after/1/mateusz/7/panel.png", show_first_animation=True)
        Pattern(panel=m_a_choice_1_7, x=0, y=0, scale=1)

        m_a_choice_2_1 = Panel(panel_url="/static/img/comic/after/2/mateusz/1/panel.png")
        Animation(panel=m_a_choice_2_1, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/after/2/mateusz/2/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/after/2/mateusz/3/panel.png", show_first_animation=True)

        m_a_choice_2_5 = Panel(panel_url="/static/img/comic/after/2/mateusz/5/panel.png", show_first_animation=True)
        Animation(panel=m_a_choice_2_5, nr=1, animation_type=AnimationType.flash)

        m_a_choice_2_8 = Panel(panel_url="/static/img/comic/after/2/mateusz/8/panel.png")
        Pattern(panel=m_a_choice_2_8, x=0, y=0, scale=1)

        Panel(panel_url="/static/img/comic/after/2/mateusz/9/panel.png", show_first_animation=True)

        # Daria
        Panel(panel_url="/static/img/comic/daria/intro/2/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/intro/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/intro/8/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/intro/10/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/intro/12/panel.png", show_first_animation=True)

        d_intro_14 = Panel(panel_url="/static/img/comic/daria/intro/14/panel.png")
        Animation(panel=d_intro_14, nr=1, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/daria/1/1/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/1/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/1/6/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/1/7/panel.png", show_first_animation=True)

        d_choice_1_8 = Panel(panel_url="/static/img/comic/daria/1/8/panel.png", show_first_animation=True)
        Pattern(panel=d_choice_1_8, x=0, y=0, scale=1)

        Panel(panel_url="/static/img/comic/daria/1/10/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/daria/2/1/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/2/4/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/2/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/2/6/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/daria/2/7/panel.png", show_first_animation=True)

        # Daria - after
        Panel(panel_url="/static/img/comic/after/1/daria/4/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/1/daria/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/1/daria/6/panel.png", show_first_animation=True)

        d_a_choice_1_7 = Panel(panel_url="/static/img/comic/after/1/daria/7/panel.png", show_first_animation=True)
        Pattern(panel=d_a_choice_1_7, x=0, y=0, scale=1)

        Panel(panel_url="/static/img/comic/after/1/daria/9/panel.png", show_first_animation=True)

        Panel(panel_url="/static/img/comic/after/2/daria/1/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/2/daria/4/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/2/daria/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/2/daria/6/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/2/daria/7/panel.png", show_first_animation=True)

        # Clarice
        c_intro_3 = Panel(panel_url="/static/img/comic/clarice/intro/3/panel.png", show_first_animation=True)
        Animation(panel=c_intro_3, nr=0, animation_type=AnimationType.flash)

        c_intro_4 = Panel(panel_url="/static/img/comic/clarice/intro/4/panel.png")
        Animation(panel=c_intro_4, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/intro/5/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/intro/7/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/intro/8/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/intro/9/panel.png", show_first_animation=True)

        c_intro_10 = Panel(panel_url="/static/img/comic/clarice/intro/10/panel.png", show_first_animation=True)
        Animation(panel=c_intro_10, nr=2, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/intro/11/panel.png", show_first_animation=True)

        c_intro_14 = Panel(panel_url="/static/img/comic/clarice/intro/14/panel.png")
        Animation(panel=c_intro_14, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/1/1/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/1/2/panel.png", show_first_animation=True)

        c_choice_1_3 = Panel(panel_url="/static/img/comic/clarice/1/3/panel.png")
        Animation(panel=c_choice_1_3, nr=0, animation_type=AnimationType.flash)

        c_choice_1_4 = Panel(panel_url="/static/img/comic/clarice/1/4/panel.png")
        Animation(panel=c_choice_1_4, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/1/6/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/1/7/panel.png", show_first_animation=True)

        c_choice_1_8 = Panel(panel_url="/static/img/comic/clarice/1/8/panel.png", show_first_animation=True)
        Pattern(panel=c_choice_1_8, x=0, y=0, scale=1)

        Panel(panel_url="/static/img/comic/clarice/1/9/panel.png", show_first_animation=True)

        c_choice_2_1 = Panel(panel_url="/static/img/comic/clarice/2/1/panel.png")
        Animation(panel=c_choice_2_1, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/2/2/panel.png", show_first_animation=True)

        c_choice_2_5 = Panel(panel_url="/static/img/comic/clarice/2/5/panel.png", show_first_animation=True)
        Animation(panel=c_choice_2_5, nr=1, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/clarice/2/7/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/clarice/2/9/panel.png", show_first_animation=True)

        # Clarice - after
        c_a_choice_1_1 = Panel(panel_url="/static/img/comic/after/1/clarice/1/panel.png", show_first_animation=True)
        Animation(panel=c_a_choice_1_1, nr=0, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/after/1/clarice/3/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/1/clarice/4/panel.png", show_first_animation=True)

        c_a_choice_1_5 = Panel(panel_url="/static/img/comic/after/1/clarice/5/panel.png", show_first_animation=True)
        Pattern(panel=c_a_choice_1_5, x=0, y=0, scale=1)

        Panel(panel_url="/static/img/comic/after/1/clarice/6/panel.png", show_first_animation=True)

        c_a_choice_2_1 = Panel(panel_url="/static/img/comic/after/2/clarice/1/panel.png", show_first_animation=True)
        Animation(panel=c_a_choice_2_1, nr=1, animation_type=AnimationType.flash)

        Panel(panel_url="/static/img/comic/after/2/clarice/3/panel.png", show_first_animation=True)
        Panel(panel_url="/static/img/comic/after/2/clarice/5/panel.png", show_first_animation=True)

    db.commit()
