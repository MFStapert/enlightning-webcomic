
class ComicController {
    constructor(comic, loader) {
        this.comic = comic;
        this.loader = loader;

        this.currentPanel;
        this.currentAnimation = 0;

        document.getElementById("next-btn").addEventListener("click", evt => this.next());
        document.getElementById("previous-btn").addEventListener("click", evt => this.previous());
    }

    setBackGround() {
        document.getElementsByTagName("BODY")[0].classList.remove("clarice");
        document.getElementsByTagName("BODY")[0].classList.remove("mateusz");
        document.getElementsByTagName("BODY")[0].classList.remove("daria");
        document.getElementsByTagName("BODY")[0].classList.add(this.currentPanel.character);
    }

    setControls() {
        this.setBackGround(this.currentPanel);
        this.setHeader(this.currentPanel);

        if (typeof this.currentPanel.next_panel_url === "undefined") {
            document.getElementById("next-btn").style.visibility="hidden";
        }
        else {
            document.getElementById("next-btn").style.visibility="visible";
        }


        if (typeof this.currentPanel.previous_panel_url === "undefined" || this.currentPanel.previous_panel_url == null) {
            document.getElementById("previous-btn").style.visibility="hidden";
        }
        else {
            document.getElementById("previous-btn").style.visibility="visible";
        }

        if(this.currentPanel.show_first_animation) {
            this.currentAnimation = 1;
        }
    }

    setHeader() {
        if(typeof this.currentPanel.type !== null && this.currentPanel.type === "choice") {
            document.getElementById("comic-header-img").src = "/static/img/comic/choice-header/" + this.currentPanel.character + ".png";
        }
        else if(!this.currentPanel.original_character) {
            document.getElementById("comic-header-img").src = "/static/img/comic/other-character-header/" + this.currentPanel.character + ".png";
        }
        else {
            document.getElementById("comic-header-img").src = "";
        }
    }

    previous() {
        if(this.currentPanel.previous_panel_url !== null) {
            this.currentAnimation = 0;
            this.comic.fetchAndSetCurrentPanel(this.currentPanel.previous_panel_url);
        }
    }

    next() {
        if(this.currentPanel.has_animations === true) {
            if(this.currentAnimation < this.loader.getAnimations.length) {
                if(this.currentAnimation !== 0) {
                    createjs.Tween.get(this.loader.getAnimations[this.currentAnimation-1]).to({alpha:0}, 1000);
                    this.animate();
                    this.currentAnimation++;

                    if(this.currentAnimation === this.loader.getAnimations.length && this.currentPanel.next_panel_url === null) {
                        document.getElementById("next-btn").style.visibility="hidden";
                    }
                }
                else {
                    this.animate();
                    this.currentAnimation++;
                }
            }
            else {
                createjs.Tween.get(this.loader.getAnimations[this.currentAnimation-1]).to({alpha:0}, 1000);
                this.currentAnimation = 0;
                createjs.Tween.get(this.loader.getPanelImg).to({alpha:0}, 1000);
                this.comic.fetchAndSetCurrentPanel(this.currentPanel.next_panel_url);
            }
        }
        else if(this.currentPanel.next_panel_url !== null) {
            this.comic.fetchAndSetCurrentPanel(this.currentPanel.next_panel_url);
        }
    }

    animate() {
        switch (this.currentPanel.animations[this.currentAnimation].animation_type) {
            case "default":
                createjs.Tween.get(this.loader.getAnimations[this.currentAnimation]).to({alpha:1}, 1000);
                break;
            case "flash":
                createjs.Tween.get(this.loader.getAnimations[this.currentAnimation]).to({alpha:1}, 1000)
                                                                                    .wait(250)
                                                                                    .to({alpha:0}, 1000)
                                                                                    .wait(250)
                                                                                    .to({alpha:1}, 1000)
                                                                                    .wait(250)
                                                                                    .to({alpha:0}, 1000);
                break;
            default:

        }
    }
}
export default ComicController;
