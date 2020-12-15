import Phaser from 'phaser'
import NavigationButton from "../components/naviButton"


export default class mainMenu extends Phaser.Scene{

    constructor(){
        super('mainMenu')
        
        this.navigationButton=new NavigationButton(this);
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Main Menu', { fontSize: 62 })
            .setOrigin(0.5)

        this.navigationButton.createBtn(width*0.5,height*0.5,"playBtn","game")
        this.navigationButton.createBtn(width*0.5,height*0.5+70,"My Collection","cardCollection")
    }

    
}