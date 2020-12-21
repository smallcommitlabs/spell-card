import Phaser from "phaser";
import playGame from "../phaser/spellCard/scenes/GameScenes/mainGame";
import preloader from "../phaser/spellCard/scenes/preloader"
import mainMenu from "../phaser/spellCard/scenes/mainMenu"
import cardCollection from "../phaser/spellCard/scenes/cardCollection"
import deckDetail from "../phaser/spellCard/scenes/cardCollectionScenes/deckScene"
import newDeck from "../phaser/spellCard/scenes/cardCollectionScenes/newDeck"
import gamePreloader from "../phaser/spellCard/scenes/GameScenes/gamePreloader"
import deckSelection from "../phaser/spellCard/scenes/GameScenes/deckSelection"
import cardSwich from "../phaser/spellCard/scenes/GameScenes/cardSwitch"
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
	scene: [preloader,mainMenu,
		playGame,cardCollection,deckDetail,
		newDeck,deckSelection,gamePreloader,
		cardSwich]
  };

const game = ()=>{ 
    new Phaser.Game(config);
    return(
        <div></div>
    );

}

export default game;