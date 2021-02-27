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
import attack0 from '../assets/spriteSheet/attack-0.png';
import playerSpritesheet from '../assets/characterAnimation/playerSpritesheet.png';
import playerJson from '../assets/characterAnimation/playerJson.json';
import shieldSmall from '../assets/characterAnimation/shieldSmall.png';
import shieldLarge from '../assets/characterAnimation/shieldLarge.png';

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
    this.load.spritesheet('attackAnimation', attack0, { frameWidth: 500, frameHeight: 484 });
    this.load.atlas('playerModel', playerSpritesheet, playerJson);
    this.load.image('shieldSmall', shieldSmall);
    this.load.image('shieldLarge', shieldLarge);
  }

  create() {
    this.scene.start('mainMenu');
  }
}

export default preloader;
