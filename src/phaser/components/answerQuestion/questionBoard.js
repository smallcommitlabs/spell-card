import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';

export default class questionBoard extends Phaser.Scene {
  init(data) {
    this.mainGame = data;
    this.counter = data.counter;
    this.mainGameTimerLabel = data.timerLabel;
  }

  constructor() {
    super('questionBoard');
  }

  create() {
    const { width, height } = this.scale;

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;

    this.add.text(300, 300, 'Answer question.....', { fontSize: 21 });

    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.counter.getRemain();
    console.log(timeRemain);
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);

    const close = this.add.text(200, 200, 'X', { fontSize: 30 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.scene.remove('questionBoard');
        this.mainGameTimerLabel.visible = true;
        console.log(this.scene);
        console.log(this.mainGame);
        this.scene = this.mainGame.object.scene;
        this.scene.resume('game', { counter: this.countdown, mainGameCounter: this.counter });
      },
      this
    );
  }

  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {
    // this.scene.start('game');
  }
}
