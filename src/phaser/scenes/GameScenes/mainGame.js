import Phaser from 'phaser';
import NavigationButton from '../../components/naviButton';
import QuestionBoard from '../../components/answerQuestion/questionBoard';
import SettingMenu from '../../components/gameSetting/settingMenu';
import CountdownController from '../../components/countdownController';

export default class playGame extends Phaser.Scene {
  //  /**@type {Phaser.GameObjects.Text} */
  //  tiemrLabel

  constructor() {
    super('game');
    this.showMenu = true;
  }

  create() {
    console.log(this.scene);
    const { width, height } = this.scale;
    this.add
      .image(width * 0.5, height * 0.5, 'gameBackground')
      .setScale(0.5)
      .setOrigin(0.5);

    this.cardDeck = this.add.image(869, 456, 'CardBack').setScale(0.315, 0.28);
    this.cardGraveyard = this.add.image(98, 456, 'CardBack').setScale(0.315, 0.28);

    // Listen to the resume event
    this.events.on('resume', function (sys, data) {
      console.log(sys);
      if (data) {
        const counter = data.counter;
        // Get the remaining time in the popup scene
        const timeRemain = counter.getRemain();
        const mainGameTimerLabel = data.mainGameCounter;
        // restart the timer
        mainGameTimerLabel.resume(timeRemain);
      }
    });

    // Setting button setup
    const settingBtn = this.add
      .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
      .setOrigin(0.5)
      .setInteractive();
    this.popUpScreen(settingBtn, 'setting', SettingMenu);

    // Mock card
    const mockCard = this.add
      .image(240, 450, 'attack8')
      .setOrigin(0.5)
      .setScale(0.1)
      .setInteractive();
    this.popUpScreen(mockCard, 'questionBoard', QuestionBoard);

    // Timer
    this.timerLabel = this.add.text(width * 0.5, 220, '5:00', { fontSize: 32 }).setOrigin(0.5);
    this.countdown = new CountdownController(this, this.timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), 300000);
  }

  update() {
    this.countdown.update();
  }

  // Creates the pop-up screen
  popUpScreen(button, popUpName, popUpInput) {
    button.on(
      'pointerdown',
      function () {
        this.scene.add(popUpName, popUpInput, true, {
          object: this,
          counter: this.countdown,
          timerLabel: this.timerLabel,
        });
        // hide the timer
        this.timerLabel.visible = false;
        // pause the scene
        this.scene.pause('game');
      },
      this
    );
  }

  handleCountdownFinished() {
    // this.scene.start('game');
  }
}
