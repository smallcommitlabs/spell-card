import Phaser from "phaser";
import playGame from "../phaser/spellCard/scenes/mainGame";
import preloader from "../phaser/spellCard/scenes/preloader"
import mainMenu from "../phaser/spellCard/scenes/mainMenu"
import cardCollection from "../phaser/spellCard/scenes/cardCollection"
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
	scene: [preloader,mainMenu,playGame,cardCollection]
  };

const game = ()=>{ 
    new Phaser.Game(config);
    return(
        <div></div>
    );

}

export default game;