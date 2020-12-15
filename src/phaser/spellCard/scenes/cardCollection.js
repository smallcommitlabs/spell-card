import Phaser from 'phaser'
import NaviButton from "../components/naviButton"


export default class cardCollection extends Phaser.Scene{


    constructor(){
        super('cardCollection')
        this.navibutton=new NaviButton(this);
    }

    create(){
        const {width,height}=this.scale

        this.add.text(width * 0.5, 50, 'Card Collection', { fontSize: 62 })
            .setOrigin(0.5)
        
        this.navibutton.createBtn(48,14,24,"Return","mainMenu");

        this.loadCards()
        this.loadDeck()

        this.navibutton.createBtn(width*0.5,height*0.75,32,"New Deck","")
        
    }

    loadDeck(){
        const {width,height}=this.scale
        let xper=0.25;

        for(let col=0; col<3;++col){
            this.navibutton.createBtn(width*xper,height*0.5,25,"Deck","");
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