class NormalPanel {
	constructor(canvas, stage, loader) {
		this.canvas = canvas;
		this.stage = stage;
		this.loader = loader;
	}

	draw() {
		this.stage.removeAllChildren();
		this.drawPanel();
	}

	drawPanelAndAnimation() {
		this.stage.removeAllChildren();
		this.drawPanel();
		this.drawAnimation();
	}

	drawPanelAndPattern() {
		this.stage.removeAllChildren();
		this.drawPattern();
		this.drawPanel();
	}

	drawPanelAndPatternAndAnimation() {
		this.stage.removeAllChildren();
		this.drawPattern();
		this.drawPanel();
		this.drawAnimation();
	}

	drawPanel() {
		let marginLeft = this.getMarginLeft();
		this.loader.getPanelImg.setTransform(marginLeft / 2, 0);
		this.stage.addChild(this.loader.getPanelImg);
	}

	drawAnimation() {
		let marginLeft = this.getMarginLeft();
		for (let i = 0; i < this.loader.getAnimations.length; i++) {
			this.loader.getAnimations[i].setTransform(marginLeft / 2, 0);
			this.stage.addChild(this.loader.getAnimations[i]);
			this.loader.getAnimations[i].alpha = 0;
			if (i === 0 && this.loader.currentPanel.show_first_animation) {
				this.loader.getAnimations[i].alpha = 1;
			}
		}
	}

	// todo remove pattern when previous
	drawPattern() {
		let marginLeft = this.getMarginLeft();
		let pat = JSON.parse(this.getCookie('pattern'));

		let patternContainer = new createjs.Container();
		this.stage.addChild(patternContainer);
		patternContainer.x = marginLeft / 2;
		patternContainer.y = 0;
		patternContainer.scaleX = 0.85;
		patternContainer.scaleY = 0.95;

		let backGround = new createjs.Shape();
		backGround.graphics
			.clear()
			.beginFill(pat.color)
			.drawRect(0, 0, 980, 960);
		patternContainer.addChild(backGround);

		for (let i = 0; i < this.loader.patterns.length; i++) {
			let pattern = this.loader.patterns[i];
			pattern.setTransform(pat.pattern[i].x, pat.pattern[i].y, pat.pattern[i].scale * 2.5, pat.pattern[i].scale * 2.5);
			patternContainer.addChild(pattern);
		}

		let fillColor;
		switch (this.loader.currentPanel.character) {
			case 'clarice':
				fillColor = '#f7e1e9';
				break;
			case 'daria':
				fillColor = '#e6edf7';
				break;
			case 'mateusz':
				fillColor = '#e3e9dd';
				break;
		}

		let fillLeft = new createjs.Shape();
		fillLeft.graphics
			.clear()
			.beginFill(fillColor)
			.drawRect(0, 0, marginLeft / 2, 960);
		this.stage.addChild(fillLeft);

		let fillRight = new createjs.Shape();
		fillRight.graphics
			.clear()
			.beginFill(fillColor)
			.drawRect(marginLeft / 2 + this.loader.getPanelImg.image.width, 0, marginLeft / 2, 960);
		this.stage.addChild(fillRight);
	}

	getMarginLeft() {
		return this.canvas.width - this.loader.getPanelImg.image.width * this.stage.scaleX;
	}

	getCookie(name) {
		let value = '; ' + document.cookie;
		let parts = value.split('; ' + name + '=');
		if (parts.length == 2)
			return parts
				.pop()
				.split(';')
				.shift();
	}
}
export default NormalPanel;
