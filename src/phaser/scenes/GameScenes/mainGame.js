import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
import QuestionBoard from '../../components/answerQuestion/questionBoard';
import SettingMenu from '../../components/gameSetting/settingMenu';
import CountdownController from '../../components/countdownController';
import PlayerStats from '../../player/playerStat';
import PlayerData from '../../player/playerData';
import DojoBoss from '../../boss/DojoBoss';

export default class playGame extends Phaser.Scene {
  //  /**@type {Phaser.GameObjects.Text} */
  //  tiemrLabel

  init(data) {
    this.selectedCards = data.selectedCards;
    this.player1 = data.player1;
    this.timeRemain = data.timeRemain;
    this.dojoBoss = data.dojoBoss;
  }

  constructor() {
    super('game');
    this.showMenu = true;
    this.playerData = new PlayerData();
    this.gamingScene = new GamingScene(this, 'game');
  }

  create() {
    const { width, height } = this.scale;
    this.cardNotAnswer = Array.from(this.selectedCards);
    this.correctCards = new Array();
    this.incorrectCards = new Array();

    // Health
    if (!this.player1) {
      this.player1 = new PlayerStats(30, 0);
      this.dojoBoss = new DojoBoss(60, 0, 'Madara');
    }

    this.gamingScene.buildScene(this.player1, this.dojoBoss, true);

    // Add text for player and boss health and armour
    this.player1Health = this.gamingScene.returnPlayer1Health();
    this.dojoBossHealth = this.gamingScene.returnBossHealth();
    this.player1Armour = this.gamingScene.returnPlayer1Armour();
    this.dojoBossArmour = this.gamingScene.returnBossArmour();

    this.add
      .text(width * 0.85, height * 0.1, this.dojoBoss.returnBossArmour(), { fontSize: 30 })
      .setOrigin(0.5);
    // Setting button setup
    const settingBtn = this.add
      .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
      .setOrigin(0.5)
      .setInteractive();
    this.popUpScreen(settingBtn, 'setting', SettingMenu);

    // Listen to the resume event
    this.events.on('resume', function (sys, data) {
      if (data) {
        const mainGameTimerLabel = data.mainGameCounter;
        if (!data.countdown) {
          mainGameTimerLabel.resume(0);
        } else {
          const counter = data.countdown;
          // Get the remaining time in the popup scene
          const timeRemain = counter.getRemain();
          mainGameTimerLabel.resume(timeRemain);
        }
      }
    });

    this.loadCards();

    // Timer
    // const time = 300000;
    const time = 10000;

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
          notAns: this.cardNotAnswer,
          correct: this.correctCards,
          incorrectCards: this.incorrectCards,
          card: card,
          key: 'game',
          player1: this.player1,
          dojoBoss: this.dojoBoss,
          background: this.gamingScene,
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
    for (const i of this.cardNotAnswer) {
      this.playerData.replaceCards(i);
    }
    this.playerData.createRandomCardList();

    this.scene.start('roundResult', {
      player1: this.player1,
      dojoBoss: this.dojoBoss,
      correctCards: this.correctCards,
      lengthPlayer: this.selectedCards.length,
    });
  }

  // Load the selected cards on to the screen
  loadCards() {
    let x = 480;
    for (const i of this.selectedCards) {
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
