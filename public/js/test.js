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
var text;
var score = 0;
var playerImg;
var playerJSON;
var character = sessionStorage.getItem('character');

//set character

function setCharacter() {
	console.log(character);
	if (character === "ryan") {
		playerImg = '../assets/players/ryan-ani.png';
		playerJSON = '../assets/players/ryan-ani.json';
	} else if (character === "andrew") {
		playerImg = '../assets/players/andrew-ani.png';
		playerJSON = '../assets/players/andrew-ani.json';
	} else if (character === "edward") {
		playerImg = '../assets/players/edward-ani.png';
		playerJSON = '../assets/players/edward-ani.json';
	} else if (character === "christine") {
		playerImg = '../assets/players/christine-ani.png';
		playerJSON = '../assets/players/christine-ani.json';
	} else {
		playerImg = '../assets/players/andrew-ani.png';
		playerJSON = '../assets/players/andrew-ani.json';
	}
}

setCharacter();


function preload () {
	this.load.tilemapTiledJSON('map', '../assets/map.json');
	this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.image('can', '../assets/can.png');
    this.load.atlas('player', playerImg,  playerJSON);
}

function create() {


	map = this.make.tilemap({key: 'map'});

	groundTiles = map.addTilesetImage('tiles');

	groundLayer = map.createDynamicLayer('World', groundTiles);

	groundLayer.setCollisionByExclusion([-1]);

	gingerTile = map.addTilesetImage('can');
	
	gingerAleLayer = map.createDynamicLayer('Ginger Ale', gingerTile);

	gingerAleLayer.setTileIndexCallback(99, getGingerAle, this);
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

	this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

	// player walking animations
	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNames('player', {prefix: 'walk', start: 1, end: 3, zeroPad: 3}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key: 'idle',
		frames: [{key: 'player', frame: 'idle'}],
		frameRate: 10
	})

	this.cameras.main.setBackgroundColor('#9bf6ff');

	text = this.add.text(20, 20, '0', {
        fontSize: '20px',
        fill: '#000000'
    });
    // fix the text to the camera
    text.setScrollFactor(0);
	
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
		player.anims.play('idle', true);
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

