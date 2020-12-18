import Phaser from "phaser";
import NavigationButton from "../../components/naviButton"
import SettingMenu from "../../components/gameSetting/settingMenu"

export default class playGame extends Phaser.Scene {
  constructor() {
    super("game");
    this.showMenu=true;
    this.settingMenu
  }

  create() {
    console.log(this.scene)
    const{width,height}=this.scale
    this.add.image(width*0.5,height*0.5,'gameBackground')
    .setScale(0.5)
    .setOrigin(0.5)

    // this.scene.add("newDeck",NewDeck,true,{ x: 400, y: 300 });
    console.log(this.settingMenu)

    // Temporary
    const navigationButton=new NavigationButton(this)
    navigationButton.createBtn(48,14,24,"Return","mainMenu")

    const menuBtn=this.add.text(width*0.5,height*0.17,"Setting", {fontSize:24})
    .setOrigin(0.5)
    .setInteractive();
    this.menuButtonFuntion(menuBtn,width*0.25,height*0.25)

  }
  update(){

  }



  menuButtonFuntion(button,x,y){
    var menu=undefined;
    button.on('pointerdown', function () {
      // console.log(menu)
      // if (this.showMenu === true) {
          console.log("un")
          this.settingMenu=this.scene.add("setting",SettingMenu,true,{object:this})
          this.showMenu=false
          this.scene.pause("game")
      // } 
      // else{
      //    this.scene.remove("gameSetting");
      //     this.showMenu=true
      // }
  }, this);

  // ()=>{
  //   this.scene.resume("game")
  // }
  }
}
