class PatternMaker {
    constructor() {
        this.canvas = document.getElementById("pattern-ctx");
        this.canvas.width = 511;
        this.canvas.height = 505;

        this.stage = new createjs.Stage(this.canvas);
		this.stage.mouseMoveOutside = true;
        this.stage.enableMouseOver();

        this.queue = new createjs.LoadQueue(false);
        this.queue.on("fileload", this.handleFileLoad, this);
        this.queue.on("complete", this.handleComplete, this);

        this.backGround;
        this.patternContainer;

        this.scale = 0.3;

        this.activePattern;
        this.color;
        this.patterns = [];
        this.warmImgsArr = [];
        this.coldImgsArr = [];
        this.warmCount = 0;
        this.coldCount = 0;

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.Touch.enable(this.stage);

        this.load();
    }

    load() {
        var coldArr = [];
        while(coldArr.length < 3) {
            var coldImg = "/static/img/comic/pattern/cold/" + (this.getRandomInt(15) + 1)  + ".png";
            if(coldArr.indexOf(coldImg) === -1) {
                coldArr.push(coldImg);
            }
        }

        var warmArr = [];
        while(warmArr.length < 3) {
            var warmImg = "/static/img/comic/pattern/warm/" + (this.getRandomInt(15) + 1) + ".png";
            if(warmArr.indexOf(warmImg) === -1) {
                warmArr.push(warmImg);
            }
        }

        for(var i = 0; i < warmArr.length; i++) {
            this.queue.loadFile({"id": "warm", "src": warmArr[i]});
        }

        for(var i = 0; i < coldArr.length; i++) {
            this.queue.loadFile({"id": "cold", "src": coldArr[i]});
        }
    }

    handleFileLoad(event) {
        if(event.item.id === "cold") {
            this.coldImgsArr.push(new createjs.Bitmap(event.result));
        }
        if(event.item.id === "warm") {
            this.warmImgsArr.push(new createjs.Bitmap(event.result));
        }
    }

    handleComplete() {
        this.stage.removeAllChildren();

        this.backGround = new createjs.Shape();
        this.stage.addChild(this.backGround);

        this.patternContainer= new createjs.Container();
        this.stage.addChild(this.patternContainer);
        this.patternContainer.x = 0;
        this.patternContainer.y = 0;

        this.setImgsToDiv();
        this.setupControls();
    }

    setImgsToDiv() {
        for(var i =0; i < this.warmImgsArr.length; i++) {
            var div = document.getElementById("pattern-warm-"+i);
            div.style.backgroundImage = "url(" + this.warmImgsArr[i].image.src + ")";
            div.addEventListener("click", evt => this.onClickWarm(evt));
        }
        for(var i =0; i < this.coldImgsArr.length; i++) {
            var div = document.getElementById("pattern-cold-"+i);
            div.style.backgroundImage = "url(" + this.coldImgsArr[i].image.src + ")";
            div.addEventListener("click", evt => this.onClickCold(evt));
        }
    }

    onClickWarm(evt) {
        var id = evt.target.id.slice(13, 14);
        this.drawPatternOnCanvas(this.warmImgsArr[id]);
        this.warmCount += 1;
        evt.target.style.backgroundImage = "";
    }

    onClickCold(evt) {
        var id = evt.target.id.slice(13, 14);
        this.drawPatternOnCanvas(this.coldImgsArr[id]);
        this.coldCount += 1;
        evt.target.style.backgroundImage = ""
    }

    drawPatternOnCanvas(pattern) {
        pattern.setTransform(0, 137 , this.scale, this.scale);
        pattern.on("pressmove", evt => this.handleMove(evt));
        pattern.on("pressmove", evt => this.handleMove(evt));
        this.patternContainer.addChild(pattern);
    }

    handleMove(e) {
        e.target.x = e.stageX - (e.target.image.width * e.target.scaleX) * 0.5;
        e.target.y = e.stageY - (e.target.image.height * e.target.scaleY) * 0.5;
        this.activePattern = e.target;
    }

    setupControls() {
        document.getElementById("increase-scale").addEventListener("click", evt => this.increaseScale());
        document.getElementById("decrease-scale").addEventListener("click", evt => this.decreaseScale());
        document.getElementById("increase-layer").addEventListener("click", evt => this.increaseLayer());
        document.getElementById("decrease-layer").addEventListener("click", evt => this.decreaseLayer());

        document.getElementById("change-background-1").addEventListener("click", evt => this.changeBackground("#FF5431"));
        document.getElementById("change-background-2").addEventListener("click", evt => this.changeBackground("#21FEF1"));
        document.getElementById("change-background-3").addEventListener("click", evt => this.changeBackground("#62C866"));
        document.getElementById("change-background-4").addEventListener("click", evt => this.changeBackground("#C85DB3"));
        document.getElementById("change-background-5").addEventListener("click", evt => this.changeBackground("#B83635"));
        document.getElementById("change-background-6").addEventListener("click", evt => this.changeBackground("#3D2AB5"));

        document.getElementById("save-pattern").addEventListener("click", evt => this.save());
    }

    increaseScale() {
        if(this.activePattern !== undefined) {
            this.activePattern.scaleX += 0.1;
            this.activePattern.scaleY += 0.1;
        }
    }

    decreaseScale() {
        if(this.activePattern !== undefined) {
            this.activePattern.scaleX -= 0.1;
            this.activePattern.scaleY -= 0.1;
        }
    }

    decreaseLayer() {
        if(this.activePattern !== undefined) {
            var newindex = this.patternContainer.getChildIndex(this.activePattern) - 1;
            this.patternContainer.setChildIndex(this.activePattern, newindex);
        }
    }

    increaseLayer() {
        if(this.activePattern !== undefined) {
            var newindex = this.patternContainer.getChildIndex(this.activePattern) + 1;
            this.patternContainer.setChildIndex(this.activePattern, newindex);
        }
    }

    save() {
        this.makeCookie();

        var siteUrl = location.href.slice(0, location.href.indexOf("pattern/"));
        var mood = location.href.slice(location.href.lastIndexOf("/pattern/") + 9, location.href.length - 1);
        if(mood === "happy") {
            window.location.href = siteUrl + "comic/clarice/intro/";
        }
        else {
            if(this.warmCount > this.coldCount) {
                window.location.href = siteUrl +  "comic/daria/intro/";
            }
            else {
                window.location.href = siteUrl +  "comic/mateusz/intro/";
            }
        }
    }

    makeCookie() {
        this.deleteAllCookies();
        var pattern = {"color": this.color};
        pattern.pattern = [];
        for(var i = 0; i < this.patternContainer.numChildren; i++) {
            var child = this.patternContainer.getChildAt(i);
            pattern.pattern.push({"x":+child.x,
                                  "y":child.y,
                                  "img":child.image.src,
                                  "scale":child.scaleX});
        }
        document.cookie = "pattern=" + JSON.stringify(pattern) + ";path=/;";
     }

    deleteAllCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    changeBackground(color) {
        this.color = color;
        this.backGround.graphics.clear().beginFill(color).drawRect(0, 0, 511, 505);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
new PatternMaker();
