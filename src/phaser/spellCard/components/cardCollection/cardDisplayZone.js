import Phaser from 'phaser'
import Zone from "../../components/zone"



export default class cardDisplayZone extends Phaser.Scene{

    /**@type {numner} */
    pageNum

    constructor(){
        super("cardDisplayZone")
        this.zone=new Zone(this);
        this.pageNum=0
        this.left
        this.right

    }

    create(){
        const {width,height}=this.scale
        const zone=this.zone.creactZone(width*0.08,height*0.25,width*0.45,height*0.55)
        this.mockCards(zone)

        const left=this.add.text(zone.x*1.1, zone.y*2.2, "<", {fontSize:24})
        .setInteractive();

        left.on("pointerdown",this.toLeft,this)
        this.left=left
        left.disableInteractive();

        const right=this.add.text(zone.width*1.1, zone.y*2.2, ">", {fontSize:24})
        .setInteractive();

        right.on("pointerdown",this.toRight,this)
        this.right=right
    }

    update(){
        if(this.pageNum>0){
            this.left.setInteractive();
        }else{
            this.left.disableInteractive()
        }
        console.log(this.pageNum)
    }

    mockCards(zone){

        let card 
        // =this.scene.add.sprite(zone.x+40, zone.y+40,"CardBack").setOrigin(0).setScale(0.2)
        let x=zone.x+40
        let y=zone.y+40
        let xper=1
        for(let i=0; i<2; ++i){
            console.log("i")
            for(let j=0;j<3;++j){
                console.log("j")
                card=this.add.sprite(x*xper, y,"CardBack").setOrigin(0).setScale(0.2)
                x+=130
            }
            y+=120
            x=zone.x+40
        }
    }

    toLeft(){
        --this.pageNum
    }

    toRight(){
        ++this.pageNum;
    }
}