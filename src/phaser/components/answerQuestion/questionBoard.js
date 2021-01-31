import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';
import PlayerData from '../../player/playerData';

export default class questionBoard extends Phaser.Scene {
  // fetch the data passed by the previous scene

  init(data) {
    this.mainGame = data;
    this.counter = data.counter;
    this.mainGameTimerLabel = data.timerLabel;
    this.question = data.question;
    this.callback = data.callback;
    this.correctCards = data.correct;
    this.incorrectCards = data.incorrectCards;
    this.selectedCard = data.card;
    this.cardNotAns = data.notAns;
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
  }

  constructor() {
    super('questionBoard');
    this.playerData = new PlayerData();
  }

  create() {
    const { width, height } = this.scale;

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;

    this.add.text(600, 500, 'Answer question..... \n \n What is ' + this.question, {
      fontSize: 42,
    });

    // Create timer
    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.counter.getRemain();
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);

    // Close button
    const close = this.add.text(200, 200, 'X', { fontSize: 60 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.closeScene();
      },
      this
    );

    // Confirm button
    const confirmBtn = this.add.text(600, 800, 'Confirm', { fontSize: 68 });
    confirmBtn.setInteractive();
    confirmBtn.on('pointerdown', () => {
      this.correctCards.push(this.selectedCard);
      this.callback();
      this.removeAnsweredCard(this.selectedCard);
      this.navigation();
    });

    // Answered wrong button
    const incorrectBtn = this.add.text(600, 900, 'Incorrect', { fontSize: 68 });
    incorrectBtn.setInteractive();
    incorrectBtn.on('pointerdown', () => {
      this.callback();
      this.incorrectCards.push(this.selectedCard);
      this.playerData.replaceCards(this.selectedCard);
      this.removeAnsweredCard(this.selectedCard);
      this.navigation();
    });
  }

  // Update counter
  update() {
    this.countdown.update();
  }

  // execute when the timer is finished
  handleCountdownFinished() {
    this.closeScene();
  }

  // Remove the current popup screen and resume the mainGame scene
  closeScene() {
    this.closeScenePrep();

    this.scene.resume('game', {
      counter: this.countdown,
      mainGameCounter: this.counter,
    });
  }

  navigation() {
    this.closeScenePrep();

    this.scene.start('playerAttack', {
      counter: this.countdown,
      mainGameCounter: this.counter,
      player1Health: this.player1Health,
      player2Health: this.player2Health,
    });
  }

  closeScenePrep() {
    this.scene.remove('questionBoard');
    // Make the timer in the mainGame to be visible
    this.mainGameTimerLabel.visible = true;
    // get the scenePlugin from the previous scene to get the the scene keys
    this.scene = this.mainGame.object.scene;
    // resume the mainGame scene and pass the countdown object from the scene and the previous scene
  }

  // Remove the answered cards from the list
  removeAnsweredCard(card) {
    const cardName = card.getCard().name;
    for (let i = 0; i < this.cardNotAns.length; i++) {
      if (this.cardNotAns[i].getCard().name === cardName) {
        this.cardNotAns.splice(i, 1);
        console.log(this.cardNotAns);
        break;
      }
    }
  }
}
