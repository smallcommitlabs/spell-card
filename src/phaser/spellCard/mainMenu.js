import Phaser from 'phaser'

export default class mainMenu extends Phaser.Scene{

    constructor(){
        super('mainMenu')
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Main Menu', { fontSize: 62 })
            .setOrigin(0.5)
    }
}