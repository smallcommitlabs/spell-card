import Phaser from "phaser";
import playGame from "../phaser/spellCard/mainGame";
import preloader from "../phaser/spellCard/preloader"
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
	scene: [preloader,playGame]
  };

const game = ()=>{ 
    new Phaser.Game(config);
    return(
        <div></div>
    );

}

export default game;