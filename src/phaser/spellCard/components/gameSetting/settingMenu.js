import Phaser from 'phaser'
export default class setting extends Phaser.Scene{

    init(data){
        this.last=data
    }

    constructor(){
        super("gameSetting")
    }

    create(){
        const {width,height}=this.scale
        console.log(width)
        // this.cameras.main.backgroundColor.setTo(106,78,86);
        // let rt = this.add.renderTexture(0, 0, width, height).setOrigin(0);
        var retangle = this.add.rectangle(0,0, width,height,0x000000).setOrigin(0);
        retangle.alpha=0.5
        this.add.text(300,300,"Setting", {fontSize:24})
        const close=this.add.text(200,200,"X", {fontSize:30}).setInteractive();
        close.on("pointerdown",()=>{
            this.scene.remove("gameSetting");
            console.log(this.scene)
            console.log(this.last)
            this.scene=this.last.object.scene
            this.scene.resume("game")
        },this)
    }

    update(){
    }
}