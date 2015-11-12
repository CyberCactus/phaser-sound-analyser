window.neo = window.neo || {};
neo.Game = function(game) {
	this.resizeObj = null;
	// this.songWithAnalyse = null; 
	// this.bmpAnalysePreview = null;
	// this.spriteAnalyse = null;
	this.soundAnalyseSprite = null;
	
	this.checkbox = null;
};

neo.Game.prototype = {
	create: function() {
		
		// set stage background
		this.game.stage.backgroundColor = "#FFFFFF";
		
		// create reference to sound analyse plugin
		this.soundAnalyse = this.game.plugins.add(new Phaser.Plugin.SoundAnalyse(this));
		
		// create sound analyse sprite with graphic support	and set to show chart bars
		this.soundAnalyseSprite = 
            this.soundAnalyse.add.soundAnalyseSprite(20, 200, 530, 200, "song1", true, this._onDecodeFinish, this)
			.showFrequencyDomainChartBars(true);
			
		// create GUI so we can show all sound analyse sprite options
		new Phaser.CheckBox(this.game, 20, 50, "check_radio", { text: "Chart bars", checked: true, onChecked: this.soundAnalyseSprite.showFrequencyDomainChartBars, context: this.soundAnalyseSprite });
		new Phaser.CheckBox(this.game, 180, 50, "check_radio", { text: "Uniform chart bars", onChecked: function (val) {
			this.soundAnalyseSprite.showFrequencyDomainChartUniform(val);
			chUniform.visible = val;
		}, context: this });
		var chUniform = new Phaser.CheckBox(this.game, 370, 50, "check_radio", { text: "Uniform chart mirror", onChecked: this.soundAnalyseSprite.showFrequencyDomainChartUniformMirror, context: this.soundAnalyseSprite });
		chUniform.visible = false;
		new Phaser.CheckBox(this.game, 20, 100, "check_radio", { text: "time frequency", onChecked: this.soundAnalyseSprite.showTimeDomainChart, context: this.soundAnalyseSprite });
		var rq1 = this.game.add.group();
		rq1.add(new Phaser.RadioBox(this.game, 180, 100, "check_radio", { text: "volume meter", frameCheck: 3, frameUncheck: 2, onChecked: this.soundAnalyseSprite.showVolumeMetar, context: this.soundAnalyseSprite }));
		rq1.add(new Phaser.RadioBox(this.game, 370, 100, "check_radio", { text: "volume meter LR", frameCheck: 3, frameUncheck: 2, onChecked: this.soundAnalyseSprite.showVolumeMetarLeftRight, context: this.soundAnalyseSprite }));
		var rq2 = this.game.add.group();
		rq2.add(new Phaser.RadioBox(this.game, 20, 150, "check_radio", { text: "Bg. volume", frameCheck: 3, frameUncheck: 2, onChecked: this.soundAnalyseSprite.showBackgroundVolume, context: this.soundAnalyseSprite }));
		rq2.add(new Phaser.RadioBox(this.game, 180, 150, "check_radio", { text: "Bg. data", frameCheck: 3, frameUncheck: 2, onChecked: this.soundAnalyseSprite.showBackgroundData, context: this.soundAnalyseSprite }));
		
	},
	_onDecodeFinish: function () {
		console.log("Sound decoding finish!");
	},
	resizePage: function (oldW, oldH, w, h) {
	},
	managePause: function() {
		this.game.paused =! this.game.paused;
	},
	update: function() {
	},
};

/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* This class represent checkbox GUI element
*
* @class Phaser.CheckBox
* @extends Phaser.Sprite
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {Object} [options={}] - object with checkbox properties, all properies are decribed below
* @subparam {string|number} [frameCheck=0] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox checked state
* @subparam {string|number} [frameUncheck=1] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox unchecked state
* @subparam {string|number} [frameCheckedDisabled=0] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox checked state when it is disabled
* @subparam {string|number} [frameUncheckedDisabled=1] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox unchecked state when it is disabled
* @subparam {Boolean} [checked=false] - true if checkbox is checked
* @subparam {Boolean} [enabled=true] - true if checkbox is checked
* @subparam {String} text - text label for this checkbox
* @subparam {Object} [textStyle={ font: "16px Arial", fill: "#ffffff", align: "center" }] - text style description
* @subparam {Number} [textPosition=Phaser.CheckBox.tpLeft] - text position
* @subparam {Number} [padding=1] - padding between text and checkbox image
* @subparam {Function} onChecked - callback method on checkbox change check state
* @subparam {Object} context - context object to be provided for checkbox check state change callback method
*/
Phaser.CheckBox = function (game, x, y, key, options) {
	
    this.options = options || {};
    
	this._checkFrame = this.options.frameCheck || 0;
	
	this._uncheckFrame = this.options.frameUncheck || 1;
	
	this._checkFrameDisabled = this.options.frameCheckedDisabled || 0;
	
	this._uncheckFrameDisabled = this.options.frameUncheckedDisabled || 1;
	
    this.onChecked = new Phaser.Signal();
	
    if (typeof this.options.onChecked === 'function') {
        this.onChecked.add(this.options.onChecked, this.options.context || this);
    }
	
	// call Sprite constructor
	Phaser.Sprite.call(this, game, x, y, key, this._uncheckFrame);
	
    if (this.options.parentGroup) {
        this.options.parentGroup.add(this);
    } else {
        game.add.existing(this);
    }
	
	this._imgKey = key;
	
	Object.defineProperty(this, "imgKey", {

		get: function () {
			return this._imgKey;
		},
		set: function (val) {
            if (this.game.cache.checkImageKey(val)) {
                this._imgKey = val;
                this.loadTexture(val, 0);
                this._updateEnableState();
            }
		}
		
	});
	
	this._checked = false;
	
	Object.defineProperty(this, "checked", {

		get: function () {
			return this._checked;
		},
		set: function (val) {
			this._updateCheckState(val);
		}
		
	});
    
    this._enabled = this.options.enabled !== false;
	
	Object.defineProperty(this, "enabled", {

		get: function () {
			return this._enabled;
		},
		set: function (val) {
            if (typeof val === 'boolean' && this._enabled != val) {
                this._enabled = val;
                this._updateEnableState();
            }
		}
		
	});
	
	this._updateCheckState(this.options.checked === true);
    
    if (!this._enabled) { this._updateEnableState(); }
	
	this.inputEnabled = true;
    this.input.useHandCursor = true;
    
    this.events.onInputDown.add(this._checkCursorClick, this);
	
	
	
	this._text = this.options.text || "";
	
	Object.defineProperty(this, "text", {

		get: function () {
			return this._text;
		},
		set: function (val) {
            this._text = val;
			this.label.text = val;
		}
		
	});
	
	var textStyle = this.options.textStyle || { font: "16px Arial", fill: "#000000", align: "center" };
	
	this.label = game.add.text(x, y, this._text, textStyle);
	
	this.addChild(this.label);
	
	
	this._padding = this.options.padding || 1;
	
	Object.defineProperty(this, "padding", {

		get: function () {
			return this._padding;
		},
		set: function (val) {
			if (this._padding != val && typeof val === 'number') {
				this._padding = val;
				this._updateLabelPosition();
			}
		}
		
	});
	
	
	this._textPosition = this.options.textPosition || Phaser.CheckBox.tpRight;
	
	Object.defineProperty(this, "textPosition", {

		get: function () {
			return this._textPosition;
		},
		set: function (val) {
			if (this._textPosition != val && typeof val === 'number') {
				this._textPosition = val;
				this._updateLabelPosition();
			}
		}
		
	});
	
	this._updateLabelPosition();
};
// constructor setup
Phaser.CheckBox.prototype = Object.create(Phaser.Sprite.prototype);
Phaser.CheckBox.prototype.constructor = Phaser.CheckBox;

Phaser.CheckBox.tpLeft = 0;
Phaser.CheckBox.tpRight = 1;
Phaser.CheckBox.tpTop = 2;
Phaser.CheckBox.tpBottom = 3;

Phaser.CheckBox.prototype._checkCursorClick = function () {
	this.checked = !this._checked;
};

Phaser.CheckBox.prototype._updateCheckState = function (val) {
	
	if (!this._enabled || typeof val !== 'boolean' || this._checked === val) {
		return false;
	}
	
	this._checked = val;
	
	this._updateEnableState();
    
    this.onChecked.dispatch(this._checked);
	
	return true;
	
};

Phaser.CheckBox.prototype._updateEnableState = function () {
	if (this.game.cache.checkImageKey(this._imgKey)) {
        if (!this._enabled) {
            if (this._checked) {
                if (typeof this._checkFrameDisabled === 'number') {
                    this.frame = this._checkFrameDisabled;
                } else {
                    this.frameName = this._checkFrameDisabled;
                }
            } else {
                if (typeof this._uncheckFrameDisabled === 'number') {
                    this.frame = this._uncheckFrameDisabled;
                } else {
                    this.frameName = this._uncheckFrameDisabled;
                }
            }
        } else if (this._checked) {
			if (typeof this._checkFrame === 'number') {
				this.frame = this._checkFrame;
			} else {
				this.frameName = this._checkFrame;
			}
		} else {
			if (typeof this._uncheckFrame === 'number') {
				this.frame = this._uncheckFrame;
			} else {
				this.frameName = this._uncheckFrame;
			}
		}
	}
}

Phaser.CheckBox.prototype._updateLabelPosition = function () {
	
	switch (this._textPosition) {
		case Phaser.CheckBox.tpLeft: {
			this.label.anchor.set(1, 0.5);
			this.label.x = -this._padding;
			this.label.y = this.height / 2;
			return true;
		}
		case Phaser.CheckBox.tpRight: {
			this.label.anchor.set(0, 0.5);
			this.label.x = this.width + this._padding;
			this.label.y = this.height / 2;
			return true;
		}
		case Phaser.CheckBox.tpTop: {
			this.label.anchor.set(0.5, 1);
			this.label.x = this.width / 2;
			this.label.y = this._padding;
			return true;
		}
		case Phaser.CheckBox.tpBottom: {
			this.label.anchor.set(0.5, 0);
			this.label.x = this.width / 2;
			this.label.y = this.height + this._padding;
			return true;
		}
		default: {
			return false;
		}
	}
	
};













/**
* Sprites are the lifeblood of your game, used for nearly everything visual.
*
* At its most basic a Sprite consists of a set of coordinates and a texture that is rendered to the canvas.
* They also contain additional properties allowing for physics motion (via Sprite.body), input handling (via Sprite.input),
* events (via Sprite.events), animation (via Sprite.animations), camera culling and more. Please see the Examples for use cases.
*
* This class represent radio button GUI element
* NOTE: Only one radio button can be checked in a group
*
* @class Phaser.RadioBox
* @extends Phaser.CheckBox
* @constructor
* @param {Phaser.Game} game - A reference to the currently running game.
* @param {number} x - The x coordinate (in world space) to position the Sprite at.
* @param {number} y - The y coordinate (in world space) to position the Sprite at.
* @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {Object} [options={}] - object with checkbox properties, all properies are decribed below
* @subparam {string|number} [frameCheck=0] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox checked state
* @subparam {string|number} [frameUncheck=1] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox unchecked state
* @subparam {string|number} [frameCheckedDisabled=0] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox checked state when it is disabled
* @subparam {string|number} [frameUncheckedDisabled=1] - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index and it will represent checkbox unchecked state when it is disabled
* @subparam {Boolean} [checked=false] - true if checkbox is checked
* @subparam {Boolean} [enabled=true] - true if checkbox is checked
* @subparam {String} text - text label for this checkbox
* @subparam {Object} [textStyle={ font: "16px Arial", fill: "#ffffff", align: "center" }] - text style description
* @subparam {Number} [textPosition=Phaser.CheckBox.tpLeft] - text position
* @subparam {Number} [padding=1] - padding between text and checkbox image
* @subparam {Function} onChecked - callback method on checkbox change check state
* @subparam {Object} context - context object to be provided for checkbox check state change callback method
*/
Phaser.RadioBox = function (game, x, y, key, options) {
    
	// call CheckBox constructor
	Phaser.CheckBox.call(this, game, x, y, key, options);
	
};
// constructor setup
Phaser.RadioBox.prototype = Object.create(Phaser.CheckBox.prototype);
Phaser.RadioBox.prototype.constructor = Phaser.RadioBox;

Phaser.RadioBox.prototype._updateCheckState = function (val) {
	
	if (!this._enabled || this._checked === val) {
		return false;
	}
	
	if (val === true) {
		this.uncheckAll();
	}
	
	this._checked = val;
	
	this._updateEnableState();
    
    this.onChecked.dispatch(this._checked);
	
	return true;
	
};

Phaser.RadioBox.prototype.eachParentRadioBox = function (property, value, exclude, callback, context) {
	if (this.parent && this.children) {
		var children = this.parent.children;
		var res;
		for (var k = 0; k < children.length; ++k) {
			if (children[k] === exclude) { 
				continue;
			}
			if (children[k] instanceof Phaser.RadioBox) {
				if (typeof property !== 'undefined' && typeof value !== 'undefined') {
					children[k][property] = value;
				}
				if (typeof callback === 'function') {
					res = callback.call(context, children[k]);
					if (res === true) return this;
				}
			}
		}
	}
	return this;
};

Phaser.RadioBox.prototype.uncheckAll = function (exclude) {
	this.eachParentRadioBox("checked", false, exclude);
};