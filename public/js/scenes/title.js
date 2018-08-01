var startScene = new Phaser.Scene('start');

startScene.preload= function(){
    this.load.image('bg','./assets/images/pixelCity.png');
}
startScene.create= function(){
    bg = this.add.tileSprite(400,300,800,600,'bg')
    
}

startScene.update= function(){
    bg.tilePositionX +=2;
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [startScene]
  };
  
  var game = new Phaser.Game(config);