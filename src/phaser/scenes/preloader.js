import Phaser from 'phaser';
import gameBackground from '../assets/gameBackground.jpg';
import playerData from '../player/playerData';
import CardBack from '../assets/CardBack.png';
import attack from '../assets/attack.jpg';
import value8 from '../assets/1.jpg';
import value2 from '../assets/2.jpg';
import value4 from '../assets/3.jpg';
import value6 from '../assets/4.jpg';
import player from '../assets/player.png';
import iconBoarder from '../assets/HealthSystem/Iconborder.png';
import armour from '../assets/HealthSystem/Armour.png';
import magic from '../assets/HealthSystem/Magic.png';

class preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  // Items to load
  preload() {
    const process = new playerData();
    process.loadCard();
    this.load.image('gameBackground', gameBackground);
    this.load.image('CardBack', CardBack);
    this.load.image('attack', attack);
    this.load.image('attack8', value8);
    this.load.image('attack2', value2);
    this.load.image('attack4', value4);
    this.load.image('attack6', value6);
    this.load.image('player', player);
    this.load.image('iconBoarder', iconBoarder);
    this.load.image('armour', armour);
    this.load.image('magic', magic);
  }

  create() {
    this.scene.start('mainMenu');
  }
}

export default preloader;
