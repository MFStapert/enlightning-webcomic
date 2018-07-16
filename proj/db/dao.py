from pony.orm import db_session

from proj.db.entities import Panel


class ComicDao:

    @staticmethod
    @db_session
    def get_panel(panel_url):
        return Panel.get(panel_url=panel_url)
