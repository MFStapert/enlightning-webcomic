export class ChoicePanel {
    constructor(comic, canvas, stage, loader) {
        this.comic = comic;
        this.canvas = canvas;
        this.stage = stage;
        this.loader = loader;
    }

    draw() {
        this.stage.removeAllChildren();

        let panelImgLeft = this.loader.getPanelImgLeft;
        let panelImgRight = this.loader.getPanelImgRight;
        let choiceImgLeft = this.loader.getChoiceImgLeft;
        let choiceImgRight = this.loader.getChoiceImgRight;

        let imgWidth = panelImgLeft.image.width + panelImgRight.image.width;
        let marginLeft = this.getMarginLeft(imgWidth);

        panelImgLeft.setTransform(marginLeft / 2, 0);
        choiceImgLeft.setTransform(marginLeft / 2, 0);
        choiceImgLeft.alpha = 0;

        panelImgLeft.on("click", evt => this.comic.fetchAndSetCurrentPanel(this.comic.currentPanel.choice_left_url));
        panelImgLeft.on("mouseover", evt => choiceImgLeft.alpha=1);
        panelImgLeft.on("mouseout", evt => choiceImgLeft.alpha=0);
        this.stage.addChild(panelImgLeft, choiceImgLeft);

        panelImgRight.setTransform(marginLeft / 2 + panelImgLeft.image.width, 0);
        choiceImgRight.setTransform(marginLeft / 2  + panelImgLeft.image.width , 0);
        choiceImgRight.alpha = 0;

        panelImgRight.on("click", evt => this.comic.fetchAndSetCurrentPanel(this.comic.currentPanel.choice_right_url));
        panelImgRight.on("mouseover", evt => choiceImgRight.alpha=1);
        panelImgRight.on("mouseout", evt => choiceImgRight.alpha=0);
        this.stage.addChild(panelImgRight, choiceImgRight);
    }

    getMarginLeft(imgWidth) {
        return this.canvas.width - imgWidth * this.stage.scaleX;
    }
}
export default ChoicePanel;
