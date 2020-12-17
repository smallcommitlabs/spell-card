import Phaser from 'phaser'
import NaviButton from "../components/naviButton"
import Zone from "../components/zone"


export default class cardCollection extends Phaser.Scene{


    constructor(){
        super('cardCollection')
        this.navibutton=new NaviButton(this);
        this.zone=new Zone(this);
        }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Card Collection', { fontSize: 62 })
            .setOrigin(0.5)
        
        this.navibutton.createBtn(48,14,24,"Return","mainMenu");

        const zone=this.zone.creactZone(width*0.1,height*0.2,width*0.45,height*0.55)
        // this.loadCards()
        // this.loadDeck()

        this.navibutton.createBtn(width*0.5,height*0.85,32,"New Deck","newDeck")
        
    }

    loadDeck(){
        const {width,height}=this.scale
        let xper=0.25;

        for(let col=0; col<3;++col){
            this.navibutton.createBtn(width*xper,height*0.5,25,"Deck","deckDetail");
            xper+=0.25
        }
    }

    loadCards(){
        const {width,height}=this.scale
        let xper=0.25;
        
        for(let col=0; col<3;++col){
            this.add.text(width*xper,height*0.25,"card",{fontSize:24});
            xper+=0.25
        }
    }
}