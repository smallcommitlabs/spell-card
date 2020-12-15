import Phaser from "phaser";
import gameBackground from '../assets/gameBackground.jpg'
class preloader extends Phaser.Scene{
    constructor(){
        super('preloader')
    }

    // Items to load
    preload(){
        console.log("preload")
        this.load.image('gameBackground',gameBackground )
    }

    
    create(){
        console.log("create")
        this.scene.start('game')
    }
}

export default preloader;