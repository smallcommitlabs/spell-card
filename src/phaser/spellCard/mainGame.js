import Phaser from "phaser";

class playGame extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    const{width,height}=this.scale
    this.add.image(width*0.5,height*0.5,'gameBackground')
    .setScale(0.5)
    .setOrigin(0.5)
  }
}

export default playGame;
