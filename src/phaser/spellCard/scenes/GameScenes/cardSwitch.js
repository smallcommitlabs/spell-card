import Phaser from 'phaser'
import NavigationButton from "../../components/naviButton"

export default class cardSwich extends Phaser.Scene{
    constructor(){
        super("cardSwitch")
        this.navigation=new NavigationButton(this)
    }

    create(){
        const {width,height}=this.scale
        this.add.text(width*0.5,height*0.1,"Please Switch a Card",{fontSize: 32})
        .setOrigin(0.5)

        this.navigation.createBtn(width*0.5,height*0.9,24,"Done","game")
        
    }

    update(){

    }
}