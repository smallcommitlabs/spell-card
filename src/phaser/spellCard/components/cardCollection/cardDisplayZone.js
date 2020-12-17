import Phaser from 'phaser'
import Zone from "../../components/zone"

export default class cardDisplayZone {

    constructor(scene){
        this.scene=scene
        this.zone=new Zone(scene);
    }

    create(){
        const {width,height}=this.scene.scale
        const zone=this.zone.creactZone(width*0.1,height*0.2,width*0.45,height*0.55)
    }

    update(){
        
    }
}