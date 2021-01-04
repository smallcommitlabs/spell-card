import Phaser from 'phaser';
import playerData from '../../player/playerData';

export default class gamePreloader extends Phaser.Scene {
  constructor() {
    super('gamePreload');
  }

  preload() {
    console.log('Loading........ Connecting...');
    const process = new playerData();
    process.createRandomCardList();
  }

  create() {
    this.scene.start('cardSwitch');
  }
}
