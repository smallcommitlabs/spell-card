import Phaser from 'phaser';
import playGame from '../phaser/scenes/GameScenes/mainGame';
import preloader from '../phaser/scenes/preloader';
import mainMenu from '../phaser/scenes/mainMenu';
import cardCollection from '../phaser/scenes/cardCollection';
import deckDetail from '../phaser/scenes/cardCollectionScenes/deckScene';
import newDeck from '../phaser/scenes/cardCollectionScenes/newDeck';
import gamePreloader from '../phaser/scenes/GameScenes/gamePreloader';
import deckSelection from '../phaser/scenes/GameScenes/deckSelection';
import cardSwich from '../phaser/scenes/GameScenes/cardSwitch';
import React, { useEffect } from 'react';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 960,
  height: 540,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
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
    cardSwich,
  ],
};

const SpellCard = () => {
  useEffect(() => {
    new Phaser.Game(config);
  }, []);

  return <div></div>;
};

export default SpellCard;
