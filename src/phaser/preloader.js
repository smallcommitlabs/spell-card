import Phaser from "phaser";

class preloader extends Phaser.Scene{
    constructor(){
        super('preloader')
    }

    // Items to load
    preload(){
        console.log("preload")
    }

    
    create(){
        console.log("create")
        this.scene.start('game')
    }
}

export default preloader;