import Phaser from 'phaser'
import NaviComponent from "../components/navigation"


export default class mainMenu extends Phaser.Scene{

    constructor(){
        super('mainMenu')
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Main Menu', { fontSize: 62 })
            .setOrigin(0.5)

      

        const playbtn =this.createBtn(width*0.5,height*0.5,"playBtn","game")
    }

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @param {string} name 
     * @param {string} sceneToNaviTo
     */
    createBtn(width, height, name,sceneToNaviTo){
        const btn=this.add.text(width,height,name,{fontSize:48}).setOrigin(0.5)
        const navi=new NaviComponent()
        navi.navigationToScene(sceneToNaviTo,this.scene,btn);
        return btn
    }

    
}