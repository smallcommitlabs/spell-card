export default class navigation{

    constructor(){

        this.sceneToNaviTo;
        this.scene;
        this.component;
    }

        /**
     * @param {String}  sceneToNaviTo
     * @param {Phaser.Scene} scene
     * @param {Phaser.GameObjects.Image} component
     */
    navigationToScene(sceneToNaviTo,scene, component){
        this.sceneToNaviTo=sceneToNaviTo
        this.scene=scene
        this.component=component

        const button=this.component.setInteractive();
        button.on("pointerdown", this.mouseClick, this)
    }

    mouseClick(){
        this.scene.start(this.sceneToNaviTo);
    }


}