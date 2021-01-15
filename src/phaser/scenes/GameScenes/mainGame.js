import Phaser from 'phaser';
import NavigationButton from '../../components/naviButton';
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
  }
  constructor() {
    super('game');
    this.showMenu = true;
    this.playerData = new PlayerData();
  }

  create() {
    this.correctCards = new Array();
    this.incorrectCards = new Array();

    console.log(this.scene);
    const { width, height } = this.scale;
    this.add
      .image(width * 0.5, height * 0.5, 'gameBackground')
      .setScale(0.5)
      .setOrigin(0.5);

    this.cardDeck = this.add.image(869, 456, 'CardBack').setScale(0.315, 0.28);
    this.cardGraveyard = this.add.image(98, 456, 'CardBack').setScale(0.315, 0.28);

    // player
    this.physics.add
      .sprite(width * 0.2, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    this.physics.add
      .sprite(width * 0.8, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    // Health
    if (!this.player1Health) {
      this.player1Health = new PlayerHealth(60);
      this.player2Health = new PlayerHealth(60);
    }
    this.add
      .text(width * 0.1, height * 0.1, this.player1Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.add
      .text(width * 0.9, height * 0.1, this.player2Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);

    // Listen to the resume event
    this.events.on('resume', function (sys, data) {
      if (data) {
        // console.log(data + "hi");
        const counter = data.counter;
        // Get the remaining time in the popup scene
        const timeRemain = counter.getRemain();
        const mainGameTimerLabel = data.mainGameCounter;
        // restart the timer
        mainGameTimerLabel.resume(timeRemain);
        // this.correctCards = data.correct;
        // console.log(this.correctCards);
      }
    });

    // Setting button setup
    const settingBtn = this.add
      .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
      .setOrigin(0.5)
      .setInteractive();
    this.popUpScreen(settingBtn, 'setting', SettingMenu);

    this.loadCards();

    // Timer
    // const time = 300000;

    const time = 20000;
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
          correct: this.correctCards,
          incorrectCards: this.incorrectCards,
          card: card,
          key: 'game',
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
    this.scene.start('roundResult', {
      player1Health: this.player1Health,
      player2Health: this.player2Health,
      correctCards: this.correctCards,
      length: this.selectedCards.length,
    });
    this.playerData.createRandomCardList();
  }

  // Load the selected cards on to the screen
  loadCards() {
    let x = 240;
    for (const i of this.selectedCards) {
      const card = this.add
        .image(x, 450, i.getCard().image)
        .setOrigin(0.5)
        .setScale(0.1)
        .setInteractive();
      x += 122;

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
