import Phaser from 'phaser'
import NaviComponent from "../components/navigation"


export default class cardCollection extends Phaser.Scene{

    constructor(){
        super('cardCollection')
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Card Collection', { fontSize: 62 })
            .setOrigin(0.5)

      console.log("this")

        // const playbtn =this.createBtn(width*0.5,height*0.5,"playBtn","game")
    }
}