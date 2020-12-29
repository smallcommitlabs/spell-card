import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';

export default class questionBoard extends Phaser.Scene {
  // fetch the data passed by the previous scene
  init(data) {
    this.mainGame = data;
    this.counter = data.counter;
    this.mainGameTimerLabel = data.timerLabel;
    this.question = data.question;
  }

  constructor() {
    super('questionBoard');
  }

  create() {
    const { width, height } = this.scale;

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;

    this.add.text(300, 250, 'Answer question..... \n \n What is ' + this.question, {
      fontSize: 21,
    });

    // Create timer
    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.counter.getRemain();
    console.log(timeRemain);
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);

    // Close button
    const close = this.add.text(200, 200, 'X', { fontSize: 30 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.scene.remove('questionBoard');
        // Make the timer in the mainGame to be visible
        this.mainGameTimerLabel.visible = true;
        // get the scenePlugin from the previous scene to get the the scene keys
        this.scene = this.mainGame.object.scene;
        // resume the mainGame scene and pass the countdown object from the scene and the previous scene
        this.scene.resume('game', { counter: this.countdown, mainGameCounter: this.counter });
      },
      this
    );
  }

  // Update counter
  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {
    this.scene.remove('questionBoard');
    this.scene = this.mainGame.object.scene;
    this.scene.start('roundResult');
  }
}
