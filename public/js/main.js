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
var cursors;
var score = 0;

function preload () {
	this.load.tilemapTiledJSON('map', '../assets/map.json');
	this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.image('can', '../assets/can.png');
    this.load.atlas('player', '../assets/player.png',  '../assets/player.json');
}

function create() {
	map = this.make.tilemap({key: 'map'});

	groundTiles = map.addTilesetImage('tiles');

	groundLayer = map.createDynamicLayer('World', groundTiles);

	groundLayer.setCollisionByExclusion([-1]);

	sweetGingerAleBaby = map.addTilesetImage('can');
	
	gingerAleLayer = map.createDynamicLayer('Ginger Ale', sweetGingerAleBaby);
	//create player 
	player = this.physics.add.sprite(200, 200, 'player');
	
	player.setBounce(0.2);
	//cant leave the map
	player.setCollideWorldBounds(true);
	//stops the guy from falling
	this.physics.add.collider(groundLayer, player);

	cursors = this.input.keyboard.createCursorKeys();

	// this.animations.create({
	// 	key: 'walk',
	// 	frames: this.animations.generateFrameNames('player')
	// });
	}

function update(time, delta) {
	if (cursors.left.isDown)
	{
		player.body.setVelocityX(-200);
		player.flipX = true;
	}else if (cursors.right.isDown){
		player.body.setVelocityX(200);
		player.flipX = false;
	}
}

function getGinger(sprite, tile) {
	gingerAleLayer.removeTileAt(tile.x, tile.y);
	score++;
	text.setText(score);
	return false
}