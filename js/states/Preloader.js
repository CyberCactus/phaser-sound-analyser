window.neo = window.neo || {};
neo.Preloader = function(game) {
	this.resizeObj = null;
};
neo.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = "#FFFFFF";
		
		this.loadGroup = this.game.add.group();
		this.loadBg = this.game.add.bitmapData(this.game.width, this.game.height);
		this.loadBgSprite = this.game.add.sprite(0, 0, this.loadBg);
		this.loadGroup.add(this.loadBgSprite);
		this.loadingSprite = this.game.add.sprite(0, 0, "loading");
		this.loadingSprite.anchor.x = 0.5;
		this.loadingSprite.animations.add("load", [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
		this.loadingSprite.animations.play("load");
		this.loadGroup.add(this.loadingSprite);
		
		// if you want to load the script with phaser
		// this.load.script('soundAnalysePlugin', 'js/plugin/SoundAnalyser_plugin.js');
		
		this.load.spritesheet('check_radio', 'img/check_radio.png', 45, 37, 4);
		
		this.load.audio('song1', 'audio/All_Time_Low__Time_Bomb.mp3', true);
		
		this.resizePage(this.game.width, this.game.height, this.game.width, this.game.height);
		
		this.startTime = new Date().getTime();
	},
	create: function() {
		
		var endTime = new Date().getTime();
		var deltaTime = endTime - this.startTime;
		
		if (deltaTime < 300) {
			var self = this;
			setTimeout(function () {
				self.state.start('Game');
			}, 500);
		} else {
			this.state.start('Game');
		}
		
	},
	resizePage: function (oldW, oldH, w, h) {
		var scaleRatioX = w / neo.game_width;
		var scaleRatioY = h / neo.game_height;
		var scaleRatio = Math.min(scaleRatioX, scaleRatioY);
		
		var w2 = w / 2;
		var h2 = h / 2;
		
		this.loadBg.clear();
		this.loadBg.resize(w, h);
		this.loadBg.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
		this.loadBg.ctx.fillRect(0, 0, w, h);
		
		this.loadingSprite.scale.set(scaleRatio);
		
		var space = (50 * scaleRatio) / 2;
		
		this.loadingSprite.x = w2;
		this.loadingSprite.y = h2 + space;
	}
};