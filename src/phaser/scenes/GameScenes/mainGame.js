import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
import QuestionBoard from '../../components/answerQuestion/questionBoard';
import SettingMenu from '../../components/gameSetting/settingMenu';
import CountdownController from '../../components/countdownController';
import PlayerHealth from '../../player/playerHealth';
import PlayerData from '../../player/playerData';

export default class playGame extends Phaser.Scene {
  //  /**@type {Phaser.GameObjects.Text} */
  //  tiemrLabel

  init(data) {
    this.selectedCards = data.selectedCards;
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
    this.timeRemain = data.timeRemain;
  }
  constructor() {
    super('game');
    this.showMenu = true;
    this.playerData = new PlayerData();
    this.gamingScene = new GamingScene(this, 'game');
  }

  create() {
    const { width, height } = this.scale;

    this.cardNotAnser = Array.from(this.selectedCards);
    this.correctCards = new Array();
    this.incorrectCards = new Array();

    // Health
    if (!this.player1Health) {
      this.player1Health = new PlayerHealth(60);
      this.player2Health = new PlayerHealth(60);
    }

    this.gamingScene.buildScene(this.player1Health, this.player2Health, true);

    // Setting button setup
    const settingBtn = this.add
      .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
      .setOrigin(0.5)
      .setInteractive();
    this.popUpScreen(settingBtn, 'setting', SettingMenu);

    // Listen to the resume event
    this.events.on('resume', function (sys, data) {
      if (data) {
        const counter = data.counter;
        // Get the remaining time in the popup scene
        const timeRemain = counter.getRemain();
        const mainGameTimerLabel = data.mainGameCounter;
        mainGameTimerLabel.resume(timeRemain);
      }
    });

    this.loadCards();

    // Timer
    // const time = 300000;
    const time = 5000;

    this.timerLabel = this.add.text(width * 0.5, 220, '5:00', { fontSize: 32 }).setOrigin(0.5);
    this.countdown = new CountdownController(this, this.timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), time);
  }

  update() {
    this.countdown.update();
  }

  // Creates the pop-up screen

  popUpScreen(button, popUpName, popUpInput, data, callback, card) {
    button.on(
      'pointerdown',
      function () {
        this.scene.add(popUpName, popUpInput, true, {
          object: this,
          counter: this.countdown,
          timerLabel: this.timerLabel,
          question: data,
          notAns: this.cardNotAnser,
          correct: this.correctCards,
          incorrectCards: this.incorrectCards,
          card: card,
          key: 'game',
          player1Health: this.player1Health,
          player2Health: this.player2Health,
          callback: callback,
        });
        // hide the timer
        this.timerLabel.visible = false;
        // pause the scene
        this.scene.pause('game');
      },
      this
    );
  }

  // executes when the timer is finish
  handleCountdownFinished() {
    for (const i of this.cardNotAnser) {
      console.log(i);
      this.playerData.replaceCards(i);
    }
    console.log(this.selectedCards);
    this.playerData.createRandomCardList();

    this.scene.start('roundResult', {
      player1Health: this.player1Health,
      player2Health: this.player2Health,
      correctCards: this.correctCards,
      length: this.selectedCards.length,
    });
  }

  // Load the selected cards on to the screen
  loadCards() {
    let x = 480;
    for (const i of this.selectedCards) {
      console.log(this.selectedCards);
      const card = this.add
        .image(x, 900, i.getCard().image)
        .setOrigin(0.5)
        .setScale(0.2)
        .setInteractive();
      x += 244;

      // Add popup question board screen to card
      this.popUpScreen(
        card,
        'questionBoard',
        QuestionBoard,
        x,
        () => {
          card.disableInteractive();
        },
        i
      );
    }
  }
}
