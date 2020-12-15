import NaviComponent from "../components/navigation"

export default class naviButton {

    /**@type {Phaser.GameObjects} */
    gameObject

    /**
     * @param {Phaser.GameObjects} gameObject
     */
    constructor(gameObject){
        this.gameObject=gameObject
    }

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {string} name 
     * @param {number} size
     * @param {string} sceneToNaviTo
     */
    createBtn(width, height, size,name,sceneToNaviTo){
        const btn=this.gameObject.add.text(width,height,name,{fontSize:size}).setOrigin(0.5)
        const navi=new NaviComponent()
        navi.navigationToScene(sceneToNaviTo,this.gameObject.scene,btn);
        return btn
    }
}