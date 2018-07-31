//have to fix size of map. you can only see it completely when you zoom out of the page. 
gameWidth = window.innerWidth - 200;
var config = {
	type: Phaser.AUTO,
	width: gameWidth,
	height: 1000,
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

var game = new Phaser.Game(config);

var map;
var score = 0;

function preload () {
	this.load.tilemapTiledJSON('map', '../assets/map.json');
	this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.image('can', '../assets/can.png');
//	this.load.atlas('player', '../assets/player.json');
}

function create() {
	map = this.make.tilemap({key: 'map'});

	groundTiles = map.addTilesetImage('tiles');

	groundLayer = map.createDynamicLayer('World', groundTiles);

	groundLayer.setCollisionByExclusion([-1]);

	sweetGingerAleBaby = map.addTilesetImage('can');

	gingerAleLayer = map.createDynamicLayer('Ginger Ale', sweetGingerAleBaby);

}

function update(time, delta) {

}

function getGinger(sprite, tile) {
	gingerAleLayer.removeTileAt(tile.x, tile.y);
	score++;
	text.setText(score);
	return false
}