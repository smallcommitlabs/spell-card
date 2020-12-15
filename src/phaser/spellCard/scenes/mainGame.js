import Phaser from "phaser";
import NaviComponent from "../components/navigation"

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
    const returnBtn=this.add.text(48,14,"Return",{fontSize:24}).setOrigin(0.5)
    const navi = new NaviComponent ("mainMenu",this.scene,returnBtn)
    navi.navigationToScene();
    
  }
}

export default playGame;
