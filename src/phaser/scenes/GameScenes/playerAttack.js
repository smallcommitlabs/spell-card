import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';

export default class playerAttack extends Phaser.Scene {
  init(data) {
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
    this.currentCard = data.currentCard;
  }

  constructor() {
    super('playerAttack');
    this.gamingScene = new GamingScene(this, 'playerAttack');
  }

  create() {
    const { width, height } = this.scale;
    this.gamingScene.buildScene(this.player1Health, this.player2Health, false);
  }
}
