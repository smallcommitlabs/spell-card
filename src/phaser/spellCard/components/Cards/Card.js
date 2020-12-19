import Phaser from "phaser";

export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setScale(0.315, 0.28).setInteractive();
            return card; 
        }
    }   
}