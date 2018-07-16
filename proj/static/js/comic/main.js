import PreLoader from "./utils/preloader.js";
import ComicController from "./utils/comiccontroller.js";

import NormalPanel from "./drawers/normalpanel.js";
import ChoicePanel from "./drawers/choicepanel.js";

class Comic {
    constructor() {
        var scale = 0.75;

        this.defaultUrlToFetch = "/api/";
        this.currentPanel;
        this.canvas = document.getElementById("ctx");
        if(window.innerWidth < 1400) {
            this.canvas.width = 1124 * scale;
            this.canvas.height = 850 * scale;
        } else {
            this.canvas.width = 1124;
            this.canvas.height = 850;
        }

        this.stage = new createjs.Stage(this.canvas);
      	this.stage.mouseMoveOutside = true;
        this.stage.enableMouseOver();
        if(window.innerWidth < 1400) {
            this.stage.scaleX = scale;
            this.stage.scaleY = scale;
        }

        this.preloader = new PreLoader(this, this.stage);
        this.comiccontroller = new ComicController(this, this.preloader);

        // Only make instance when load complete
        this.normalpanel = new NormalPanel(this.canvas, this.stage, this.preloader);
        this.choicepanel = new ChoicePanel(this, this.canvas, this.stage, this.preloader);

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.Touch.enable(this.stage);
        this.start();
    }

    start() {
        let apiUrl = location.href.slice(location.href.lastIndexOf("/comic/") + 7, location.href.length);
        if(apiUrl.length !== 0) {
            this.fetchAndSetCurrentPanel("/api/" + apiUrl);
        }
        else {
            this.fetchAndSetCurrentPanel(this.defaultUrlToFetch);
        }
    }

    fetchAndSetCurrentPanel(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(json => {
            this.currentPanel = json;
            this.comiccontroller.currentPanel = this.currentPanel;
            this.comiccontroller.setControls();
            this.preloader.load(this.currentPanel);
            this.setUrl(this.currentPanel.panel_url);
        });
    }

    setUrl(panelUrl) {
        let apiUrlToSet = panelUrl.slice(panelUrl.indexOf("/api/") + 5, panelUrl.length);
        let siteUrl = location.href.slice(0, location.href.lastIndexOf("/comic/") + 7);
        let currentUrl = siteUrl + apiUrlToSet;
        history.pushState(location.href, null, siteUrl + apiUrlToSet);
    }
}

new Comic();
