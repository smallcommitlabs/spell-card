import Phaser from 'phaser';
import playerData from '../../player/playerData';
import DojoBoss from '../../boss/DojoBoss';

export default class gamePreloader extends Phaser.Scene {
  constructor() {
    super('gamePreload');
  }

  preload() {
    const process = new playerData();
    this.dojoBoss = new DojoBoss(60, 0, 'Madara');
    process.createRandomCardList();
  }

  create() {
    this.scene.start('cardSwitch', { dojoBoss: this.dojoBoss });
  }
}
