var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
  scene: {
      preload: preload,
      create: create,
      
  }
};

 
function preload() {
    this.load.image('pixCity', 'assets/images/pixelCity.png');
}

function create (){
    
   this.background1= this.add.tileSprite(400,300,800,600,'pixCity');
  
}

function update(){
    this.background1.tilePosition.x += 2;

}

