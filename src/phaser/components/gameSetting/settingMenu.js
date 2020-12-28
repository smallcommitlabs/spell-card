import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';

export default class setting extends Phaser.Scene {
  init(data) {
    this.mainGame = data;
    this.counter = data.counter;
    this.mainGameTimerLabel = data.timerLabel;
  }

  constructor() {
    super('gameSetting');
  }

  create() {
    const { width, height } = this.scale;
    console.log(this.counter);

    // this.cameras.main.backgroundColor.setTo(106,78,86);
    // let rt = this.add.renderTexture(0, 0, width, height).setOrigin(0);
    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;
    const surrender = this.add.text(300, 300, 'Surrender', { fontSize: 24 }).setInteractive();

    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.counter.getRemain();
    console.log(timeRemain);
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);

    surrender.on('pointerdown', () => {
      this.scene.remove('gameSetting');
      this.scene = this.mainGame.object.scene;
      this.scene.start('mainMenu');
    });

    const close = this.add.text(200, 200, 'X', { fontSize: 30 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.scene.remove('gameSetting');
        this.mainGameTimerLabel.visible = true;
        this.scene = this.mainGame.object.scene;
        this.scene.resume('game', { counter: this.countdown, mainGameCounter: this.counter });
      },
      this
    );
  }

  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {}
}
