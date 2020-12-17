import Phaser from "phaser";
import gameBackground from '../../../assets/gameBackground.jpg'
import CardBack from '../../../assets/CardBack.png'
import attack from '../../../assets/attack.jpg'

class preloader extends Phaser.Scene{
    constructor(){
        super('preloader')
    }

    // Items to load
    preload(){
        console.log("preload")
        this.load.image('gameBackground',gameBackground )
        this.load.image('CardBack',CardBack)
        this.load.image('attack',attack)
    }

    
    create(){
        console.log("create")
        this.scene.start('mainMenu')
    }
}

export default preloader;