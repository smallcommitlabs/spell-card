import Phaser from 'phaser'
import NaviButton from "../components/naviButton"


export default class cardCollection extends Phaser.Scene{

    constructor(){
        super('cardCollection')
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Card Collection', { fontSize: 62 })
            .setOrigin(0.5)
        
        const navibuttion=new NaviButton(this);
        navibuttion.createBtn(48,14,24,"Return","mainMenu");

        
        
    }
}