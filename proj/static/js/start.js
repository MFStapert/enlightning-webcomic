class Start {
    constructor() {
        this.canvas = document.getElementById("ctx-start");
        this.canvas.width = 924;
        this.canvas.height = 700;

        this.stage = new createjs.Stage(this.canvas);
		this.stage.mouseMoveOutside = true;
        this.stage.enableMouseOver();

        this.babyLeft;
        this.babyRight;
        this.animateLeft = false;
        this.animateRight = false;

        this.load();
    }

    load() {
        this.stage.removeAllChildren();

        var babyLeftData =     {
            images: ["/static/img/comic/start/left.png"],
            frames: {width:456, height: 696},
            animations: {
                animate: [0,1,2,3,4,5,6,7,8,8,7,6,5,4,3,2,1,0]
            }
        };
        var babyLeftSpriteSheet = new createjs.SpriteSheet(babyLeftData);
        this.babyLeft = new createjs.Sprite(babyLeftSpriteSheet, "animate");
        this.stage.addChild(this.babyLeft);

        this.babyLeft.on("mouseover", evt => this.startAnimateLeft(evt));
        this.babyLeft.on("mouseout", evt => this.stopAnimateLeft(evt));
        this.babyLeft.on("click", evt => window.location.href = window.location.href.split("/start")[0] + "/pattern/sad/");
        this.babyLeft.gotoAndStop("animate")

        var babyRightData =     {
            images: ["/static/img/comic/start/right.png"],
            frames: {width:401, height: 609},
            animations: {
                animate: [0,1,2,3,4,5,6,7,8,8,7,6,5,4,3,2,1,0]
            }
        };
        var babyRightSpriteSheet = new createjs.SpriteSheet(babyRightData);
        this.babyRight = new createjs.Sprite(babyRightSpriteSheet, "animate");
        this.stage.addChild(this.babyRight);
        this.babyRight.setTransform(480, 0);

        this.babyRight.on("mouseover", evt => this.startAnimateRight(evt));
        this.babyRight.on("mouseout", evt => this.stopAnimateRight(evt));
        this.babyRight.on("click", evt => window.location.href = window.location.href.split("/start")[0] + "/pattern/happy/");
        this.babyRight.gotoAndStop("animate")

        createjs.Ticker.setFPS(4);
        createjs.Ticker.addEventListener("tick", evt => this.tick());
    }

    startAnimateRight(e) {
        e.target.gotoAndPlay("animate");
    }

    startAnimateLeft() {
        this.babyLeft.gotoAndPlay("animate");
    }

    stopAnimateRight(e) {
        e.target.gotoAndStop("animate")
    }

    stopAnimateLeft() {
        this.babyLeft.gotoAndStop("animate");
    }

    tick() {
        this.stage.update();
    }
}
new Start();
