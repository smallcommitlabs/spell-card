import Phaser from "phaser";
import NavigationButton from "../../components/naviButton"

export default class playGame extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    const{width,height}=this.scale
    this.add.image(width*0.5,height*0.5,'gameBackground')
    .setScale(0.5)
    .setOrigin(0.5)

    this.cardDeck = this.add.image(869, 456, 'CardBack').setScale(0.315, 0.28)
    this.cardGraveyard = this.add.image(98, 456, 'CardBack').setScale(0.315, 0.28)

    // Temporary
    const navigationButton=new NavigationButton(this)
    navigationButton.createBtn(48,14,24,"Return","mainMenu")
    
  }
}
