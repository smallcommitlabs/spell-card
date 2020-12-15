import Phaser from 'phaser'
import NavigationButton from '../../components/naviButton'

export default class deckSelection extends Phaser.Scene{
    constructor(){
        super("deckSelction")
        this.navibutton =new NavigationButton(this)
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Choose your deck', { fontSize: 62 })
            .setOrigin(0.5)

        this.navibutton.createBtn(48,14,24,"Return","mainMenu");

        const myColectionBtn=this.navibutton.createBtn(width*0.5,height*0.5,24,"My Collection","cardCollection")

        const submit=this.navibutton.createBtn(width*0.5,height*0.75,42,"Play","gamePreload");
    }
}