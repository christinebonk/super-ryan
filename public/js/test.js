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
	this.load.image('cat', '../assets/cat.png');
    this.load.atlas('player', '../assets/player.png',  '../assets/player.json');
}

function create() {

	map = this.make.tilemap({key: 'map'});

	groundTiles = map.addTilesetImage('tiles');

	groundLayer = map.createDynamicLayer('World', groundTiles) ;

	groundLayer.setCollisionByExclusion([-1]);

	sweetGingerAleBaby = map.addTilesetImage('can');
	
	gingerAleLayer = map.createDynamicLayer('Ginger Ale', sweetGingerAleBaby);

	gingerAleLayer.setTileIndexCallback(17, getGingerAle, this);
	//create player 
	player = this.physics.add.sprite(200, 200, 'player');
	
	player.setBounce(0.2);
	//cant leave the map
	player.setCollideWorldBounds(true);

	player.body.setSize(player.width, player.height-8);
	//stops the guy from falling
	this.physics.add.overlap(player, gingerAleLayer);
	this.physics.add.collider(groundLayer, player);

	cursors = this.input.keyboard.createCursorKeys();

	// this.animations.create({
	// 	key: 'walk',
	// 	frames: this.animations.generateFrameNames('player')
	// });
	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	this.cameras.main.startFollow(player);


	//player walking animations
	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'idle',
		frames: [{key: player, frame: 'p1_stand'}],
		frameRate: 10
	})
	
}


	

function update(time, delta) {
	if (cursors.left.isDown)
	{
		player.body.setVelocityX(-200);
		player.anims.play('walk', true);
		player.flipX = true;
	}else if (cursors.right.isDown){
		player.body.setVelocityX(200);
		player.anims.play('walk', true);
		player.flipX = false;
	}else{
		player.body.setVelocityX(0);
		//player.anims.play('idle', true);
	}
	if(cursors.up.isDown){
		player.body.setVelocityY(-500)
	}
}

function getGingerAle(sprite, tile) {
	gingerAleLayer.removeTileAt(tile.x, tile.y);
	score++;
	text.setText(score);
	return false
}