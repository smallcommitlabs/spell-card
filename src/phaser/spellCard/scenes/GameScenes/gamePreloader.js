import CardBack from '../../../../assets/CardBack.png'
import attack from '../../../../assets/attack.jpg'

export default class gamePreloader extends Phaser.Scene{
    constructor(){
        super("gamePreload")
    }

    preload(){
        console.log("Loading........ Connecting...")
        this.load.image('CardBack',CardBack)
        this.load.image('attack',attack)
    }

    create(){
        this.scene.start("game")
    }
    
}