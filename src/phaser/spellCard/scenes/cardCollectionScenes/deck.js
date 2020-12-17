import Phaser from 'phaser'
import NavigationButton from '../../components/naviButton'

export default class deck extends Phaser.Scene{
    constructor(){
        super("deckDetail")
        this.navibutton =new NavigationButton(this)
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Deck', { fontSize: 62 })
            .setOrigin(0.5)

        this.navibutton.createBtn(48,14,24,"Return","cardCollection");

        const submit=this.navibutton.createBtn(width*0.5,height*0.75,24,"Submit","cardCollection");
    }
}