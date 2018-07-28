var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 500},
			debug: false
		}
	},
	scene: {
		key: 'main',
		preload: preload,
		create: create,
		update: update
	}
}

var game = new Phaser.game(config);

var map;
var score = 0;

function preload () {
	this.load.tilemapTiledJSON('map', '../assets/map.json');
	this.load.image('can', '../assets/can.png');
	this.load.atlas('player', '../assets/player.json');
}

function create() {

}

function update(time, delta) {

}

function getGinger(sprite, tile) {
	gingerLayer.removeTileAt(tile.x, tile.y);
	score++;
	text.setText(score);
	return false
}