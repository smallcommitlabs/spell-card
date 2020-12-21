import Phaser from 'phaser'

export default class gamePreloader extends Phaser.Scene{
    constructor(){
        super("gamePreload")
    }

    preload(){
        console.log("Loading........ Connecting...")
    }

    create(){
        this.scene.start("cardSwitch")
    }
    
}