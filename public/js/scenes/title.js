var startScene = new Phaser.Scene('start');

startScene.preload= function(){
    this.load.image('bg','./assets/images/pixelCity.png');
    this.load.spritesheet('sk8','./assets/images/sk8.png', {frameWidth: 361.8, frameHeight: 362,endFrame:135});

}
startScene.create= function(){
    bg = this.add.tileSprite(400,300,800,600,'bg')
var config = {
    key:'skate',
    frames: this.anims.generateFrameNumbers('sk8', { start:45, end:64, first:45}),
    frameRate: 5,
    
};
    this.anims.create(config);
    var sk8 = this.add.sprite(50,430,'sk8');
    sk8.anims.play('skate');

    
}

startScene.update= function(){
    bg.tilePositionX +=1;
    

    



}








var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [startScene]
  };
  
  var game = new Phaser.Game(config);