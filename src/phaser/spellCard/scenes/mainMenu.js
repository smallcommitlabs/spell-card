import Phaser from 'phaser'
import NaviComponent from "../components/navigation"


export default class mainMenu extends Phaser.Scene{

    constructor(){
        super('mainMenu')
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Main Menu', { fontSize: 62 })
            .setOrigin(0.5)

      

        const playbtn =this.add.text(width*0.5,height*0.5,"playBtn",{ fontSize: 32 }).setOrigin(0.5)
        const navi=new NaviComponent()
        navi.navigationToScene("game",this.scene,playbtn);
    }

    
}