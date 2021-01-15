import Phaser from 'phaser';
import playGame from '../phaser/scenes/GameScenes/mainGame';
import preloader from '../phaser/scenes/preloader';
import mainMenu from '../phaser/scenes/mainMenu';
import cardCollection from '../phaser/scenes/cardCollection';
import deckDetail from '../phaser/scenes/cardCollectionScenes/deckScene';
import newDeck from '../phaser/scenes/cardCollectionScenes/newDeck';
import gamePreloader from '../phaser/scenes/GameScenes/gamePreloader';
import deckSelection from '../phaser/scenes/GameScenes/deckSelection';
import cardSwitch from '../phaser/scenes/GameScenes/cardSwitch';
import roundResult from '../phaser/scenes/GameScenes/roundResult';
import gameResult from '../phaser/scenes/GameScenes/gameResult';
import React, { useEffect } from 'react';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 960,
  height: 540,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: [
    preloader,
    mainMenu,
    playGame,
    cardCollection,
    deckDetail,
    newDeck,
    deckSelection,
    gamePreloader,
    cardSwitch,
    roundResult,
    gameResult,

  ],
};

const SpellCard = () => {
  useEffect(() => {
    new Phaser.Game(config);
  }, []);

  return <div id={'phaser'} style={{ height: config.height, width: config.width }}></div>;
};

export default SpellCard;
