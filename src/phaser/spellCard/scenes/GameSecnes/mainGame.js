import Phaser from "phaser";
import NavigationButton from "../../components/naviButton"

class playGame extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    const{width,height}=this.scale
    this.add.image(width*0.5,height*0.5,'gameBackground')
    .setScale(0.5)
    .setOrigin(0.5)

    // Temporary
    const navigationButton=new NavigationButton(this)
    navigationButton.createBtn(48,14,24,"Return","mainMenu")
    
  }
}

export default playGame;
