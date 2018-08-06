//have to fix size of map. you can only see it completely when you zoom out of the page. 
// gameWidth = window.innerWidth - 200;
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene:[startScene,MainGame],
	version:'1.0a',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 500},
			debug: false	
		}
	}
	
}

var startScene = new Phaser.Scene('start');

var bg;
//loads images//
startScene.preload= function(){
    this.load.image('bg','./assets/images/pixelCity.png');
    this.load.spritesheet('sk8','./assets/images/sk8.png', {frameWidth: 361.8, frameHeight: 362,endFrame:135});
    this.load.image('Title','./assets/images/SuperRyan.png');
    this.load.image('startbtn','./assets/images/Start.png');
}
function SceneSwap(){
	this.scene.start(MainGame);
}
//creation central//
startScene.create= function(){
     bg = this.add.tileSprite(400,300,800,600,'bg');
    title= this.add.image(400,-100,'Title');
//start button//
this.startbtn = this.add.sprite(400,300,'startbtn').setInteractive().on('pointerdown', ()=> this.SceneSwap());




startbtn.alpha = 0;



var tween = this.tweens.add({
    targets: startbtn,
    alpha:{value:1, delay:8000}
})
//Make button change scenes//


// Below is the cursor hover option//
// this.startBtn = this.on('pointerover',function())



//version text//
var text =this.add.text(10,580,'', {font: '16px Courier. fill: #ffffff'});

text.setText([
    'Version: ' + game.config.gameVersion
]);


//tween for animations//







var tween = this.tweens.add({
    targets: title,
    props:{
        y: {value:100, duration:1000, ease:'Bounce.easeInOut',delay:7000}
    }
})

var config = {
    key:'skate',
    frames: this.anims.generateFrameNumbers('sk8', { start:45, end:64, first:45}),
    frameRate: 5,
   
};
    this.anims.create(config);
    var sk8 = this.add.sprite(-90,430,'sk8');
    sk8.anims.play('skate');



    var tween = this.tweens.add({
        targets: sk8,
        props:{
            x: {value:'+=800',duration: 3000, ease:'Power2'}
        },
        yoyo:true,
        
        
        delay:2000
    });

 
    
    
}


startScene.update= function(){

var Tile= bg.tilePositionX+=2;


    

   
};

var game = new Phaser.Game(config);
var MainGame= new Phaser.Scene('main');
var cursors;
var text;
var score = 0;

MainGame.preload = function () {
	this.load.tilemapTiledJSON('map', '../assets/map.json');
	this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.image('can', '../assets/can.png');
    this.load.atlas('player', '../assets/player.png',  '../assets/player.json');
}

MainGame.create= function() {


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

	this.cameras.main.setBackgroundColor('#ccccff');

	text = this.add.text(20, 20, '0', {
        fontSize: '20px',
        fill: '#000000'
    });
    // fix the text to the camera
    text.setScrollFactor(0);
	
}


	

MainGame.update = function(time, delta) {
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

MainGame.getGingerAle=function(sprite, tile) {
	gingerAleLayer.removeTileAt(tile.x, tile.y);
	score++;
	text.setText(score);
	return false
}

var game = new Phaser.Game(config);



////MORNING TEST SNOWBILLRS PAGE ON BUTTON SCENE////