import Phaser from 'phaser';
import NaviButton from '../../components/naviButton';

export default class gameResult extends Phaser.Scene {
  init(data) {
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
  }

  constructor() {
    super('gameResult');
    this.navibutton = new NaviButton(this);
  }

  create() {
    const { width, height } = this.scale;

    this.navibutton.createSpecialButton(48, 14, 24, 'Return', () => {
      this.scene.start('mainMenu');
    });

    this.add.text(width * 0.5, height * 0.5, 'You win', { fontSize: 40 });
  }
}
