import Phaser from 'phaser';
import NavigationButton from '../../components/naviButton';
import countdownController from '../../components/countdownController';

export default class cardSwich extends Phaser.Scene {
  /** @type {CountdownController} */
  countdown;

  constructor() {
    super('cardSwitch');
    this.navigation = new NavigationButton(this);
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width * 0.5, height * 0.1, 'Please Switch a Card', { fontSize: 32 })
      .setOrigin(0.5);

    const tiemrLabel = this.add
      .text(width * 0.5, height * 0.2, '20', { fontSize: 42 })
      .setOrigin(0.5);

    this.countdown = new countdownController(this, tiemrLabel);

    this.countdown.start(this.handleCountdownFinished.bind(this), 20000);

    this.navigation.createSpecialButton(width * 0.5, height * 0.9, 24, 'Done', () => {
      this.countdown.stop();
      this.scene.start('game');
    });
  }

  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {
    this.scene.start('game');
  }
}
