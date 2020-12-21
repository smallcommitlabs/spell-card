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
     * @param {number} size
     * @param {string} name 
     * @param {string} sceneToNaviTo
     */
    createBtn(width, height, size,name,sceneToNaviTo){
        const btn=this.gameObject.add.text(width,height,name,{fontSize:size}).setOrigin(0.5)
        const navi=new NaviComponent(this.gameObject)
        navi.navigationToScene(sceneToNaviTo,btn);
        return btn
    }

    createSpecialButton(width, height, size,name,custFunc){
        const btn=this.gameObject.add.text(width,height,name,{fontSize:size}).setOrigin(0.5)
        const navi=new NaviComponent(this.gameObject)
        navi.custNavigationToScene(btn,custFunc);
        return btn
    }
}