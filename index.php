<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Phaser - Sound Analyse</title>
	<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
	<link href="css/main.css" rel="stylesheet">
	
	<script src="js/lib/phaser.js"></script>
	
	<script src="js/plugin/SoundAnalyse/SoundAnalyse.js"></script>
	
	<script src="js/states/Boot.js"></script>
	<script src="js/states/Preloader.js"></script>
	<script src="js/states/Game.js"></script>
</head>
<body>

	<script>
	var game = null;
	(function() {
		window.neo = window.neo || {};
		game = new Phaser.Game(neo.game_width, neo.game_height, Phaser.AUTO, 'game');
		game.state.add('Boot', neo.Boot);
		game.state.add('Preloader', neo.Preloader);
		game.state.add('Game', neo.Game);
		game.state.start('Boot');
	})();
	</script>
	
</body>
</html>