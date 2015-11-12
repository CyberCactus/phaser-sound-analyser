window.neo = window.neo || {};
neo.Boot = function(game) {};
neo.Boot.prototype = {
	preload: function() {
		this.load.spritesheet('loading', 'img/loading.png', 128, 128, 8); 
		
		this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		
		this.game.scale.updateDimensions(window.innerWidth, window.innerHeight, true);
	},
	create: function() {
        this.state.start('Preloader');
	}
};