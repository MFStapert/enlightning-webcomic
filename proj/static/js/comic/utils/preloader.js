export default class PreLoader {
	constructor(comic) {
		this.comic = comic;

		this.currentPanel;

		// For normal panel
		this.panelImg;
		this.animations = [];
		this.patternLocation;
		this.patterns = [];

		// For choicepanel
		this.panelImgLeft;
		this.panelImgRight;
		this.choiceImgLeft;
		this.choiceImgRight;

		this.queue = new createjs.LoadQueue(false);
		this.queue.on('fileload', this.handleFileLoad, this);
		this.queue.on('complete', this.handleComplete, this);
	}

	load(panel) {
		this.currentPanel = panel;
		switch (this.currentPanel.type) {
			case 'default':
				this.loadDefaultPanel();
				break;
			case 'choice':
				this.loadChoicePanel();
				break;
		}
	}

	loadDefaultPanel() {
		this.queue.loadFile({ id: 'panel', src: this.currentPanel.panel_img });
		if (this.currentPanel.has_animations) {
			this.animations = [];
			this.currentPanel.animations.forEach(a => this.queue.loadFile({ id: 'animation', src: a.location }));
		}
		if (this.currentPanel.has_pattern) {
			if (this.patterns.length === 0) {
				let pat = JSON.parse(this.getCookie('pattern'));
				pat.pattern.forEach(p => this.queue.loadFile({ id: 'pattern', src: p.img }));
			}
		}
	}

	loadChoicePanel() {
		this.queue.loadFile({ id: 'panel_left_img', src: this.currentPanel.panel_left_img });
		this.queue.loadFile({ id: 'panel_right_img', src: this.currentPanel.panel_right_img });
		this.queue.loadFile({ id: 'choice_left_img', src: this.currentPanel.choice_left_img });
		this.queue.loadFile({ id: 'choice_right_img', src: this.currentPanel.choice_right_img });
	}

	loadPatternMaker() {
		this.currentPanel.patterns.forEach(p => this.queue.loadFile({ id: 'pattern', src: p }));
	}

	handleFileLoad(event) {
		if (event.item.id === 'panel') {
			this.panelImg = new createjs.Bitmap(event.result);
		}
		if (event.item.id === 'panel_left_img') {
			this.panelImgLeft = new createjs.Bitmap(event.result);
		}
		if (event.item.id === 'panel_right_img') {
			this.panelImgRight = new createjs.Bitmap(event.result);
		}
		if (event.item.id === 'choice_left_img') {
			this.choiceImgLeft = new createjs.Bitmap(event.result);
		}
		if (event.item.id === 'choice_right_img') {
			this.choiceImgRight = new createjs.Bitmap(event.result);
		}
		if (event.item.id === 'animation') {
			this.animations.push(new createjs.Bitmap(event.result));
		}
		if (event.item.id === 'pattern') {
			this.patterns.push(new createjs.Bitmap(event.result));
		}
	}

	handleComplete() {
		switch (this.currentPanel.type) {
			case 'choice':
				this.comic.choicepanel.draw();
				break;
			case 'pattern':
				this.comic.patternmaker.setup();
				break;
			default:
				if (this.currentPanel.has_pattern === true && this.currentPanel.has_animations === true) {
					this.comic.normalpanel.drawPanelAndPatternAndAnimation();
				} else if (this.currentPanel.has_animations === true) {
					this.comic.normalpanel.drawPanelAndAnimation();
				} else if (this.currentPanel.has_pattern === true) {
					this.comic.normalpanel.drawPanelAndPattern();
				} else {
					this.comic.normalpanel.draw();
				}
				break;
		}
	}

	get getPanelImg() {
		return this.panelImg;
	}

	get getPanelImgLeft() {
		return this.panelImgLeft;
	}

	get getPanelImgRight() {
		return this.panelImgRight;
	}

	get getChoiceImgLeft() {
		return this.choiceImgLeft;
	}

	get getChoiceImgRight() {
		return this.choiceImgRight;
	}

	get getAnimations() {
		return this.animations;
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
