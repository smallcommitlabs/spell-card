export default class navigation{

    /**
     * @param {String}  sceneToNaviTo
     * @param {Phaser.Scene} scene
     * @param {Phaser.GameObjects.Image} component
     */
    constructor(sceneToNaviTo,scene, component){

        this.sceneToNaviTo=sceneToNaviTo
        this.scene=scene
        this.component=component
    }

    navigationToScene(){
        const button=this.component.setInteractive();
        button.on("pointerdown", this.mouseClick, this)
    }

    mouseClick(){
        this.scene.start(this.sceneToNaviTo);
    }


}