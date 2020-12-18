import Phaser from 'phaser'
import NaviButton from "../components/naviButton"
import Zone from "../components/zone"
import cardDisplayZone from '../components/cardCollection/cardDisplayZone'

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
        
        // console.log(this.add.sprite)

        const allCard=this.add.text(width*0.1,height*0.25-24,"All Card",{fontSize:24}).setInteractive()
        const ownedCards=this.add.text(width*0.1+200,height*0.25-24,"Owned Card",{fontSize:24}).setInteractive();
        
        allCard.on("pointerdown",this.showAllCards,this)
        ownedCards.on("pointerdown",this.showOwnedCards,this)
        
        this.navibutton.createSpecialButton(48,14,24,"Return",()=>{
            this.scene.remove("cardDisplayZone")
            this.scene.start("mainMenu")
        });

        this.scene.add("cardDisplay",cardDisplayZone,true)
        
        // this.loadCards()
        // this.loadDeck()

        this.navibutton.createSpecialButton(width*0.5,height*0.85,32,"New Deck",()=>{
            this.scene.remove("cardDisplayZone")
            this.scene.start("newDeck")
        })
        
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


    showAllCards(){

    }
    
    showOwnedCards(){
    }


    update(){
        console.log()

    }
}