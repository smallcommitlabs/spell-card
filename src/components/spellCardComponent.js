import Phaser from "phaser";
import playGame from "../phaser/spellCard/scenes/GameSecnes/mainGame";
import preloader from "../phaser/spellCard/scenes/preloader"
import mainMenu from "../phaser/spellCard/scenes/mainMenu"
import cardCollection from "../phaser/spellCard/scenes/cardCollection"
import deckDetail from "../phaser/spellCard/scenes/cardCollectiobScenes/deck"
import newDeck from "../phaser/spellCard/scenes/cardCollectiobScenes/newDeck"
import gamePreloader from "../phaser/spellCard/scenes/GameSecnes/gamePreloader"
import deckSelection from "../phaser/spellCard/scenes/GameSecnes/deckSelection"
import React from "react";

export const config = {
	type: Phaser.AUTO,
	parent: "phaser",
	width: 960,
	height: 540,
	physics:{
	  default:'arcade',
	  arcade:{
		debug:true,
		gravity:{y:0}
	  }
	},
	scene: [preloader,mainMenu,playGame,cardCollection,deckDetail,newDeck,deckSelection,gamePreloader]
  };

const game = ()=>{ 
    new Phaser.Game(config);
    return(
        <div></div>
    );

}

export default game;