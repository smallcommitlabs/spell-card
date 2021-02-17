import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';
import PlayerData from '../../player/playerData';
import playerAttack from '../../scenes/GameScenes/playerAttack';

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
    this.player1 = data.player1;
    this.dojoBoss = data.dojoBoss;
    this.background = data.background;
  }

  constructor() {
    super('questionBoard');
    this.playerData = new PlayerData();
  }

  create() {
    const { width, height } = this.scale;

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;

    this.add.text(600, 400, 'What is ' + this.question, {
      fontSize: 42,
      fontFamily: 'Arial',
    });

    // Create timer
    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.counter.getRemain();
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);

    // Close button
    const close = this.add
      .text(200, 200, 'Return', { fontSize: 60, fontFamily: 'Arial' })
      .setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.closeScene();
      },
      this
    );

    // Confirm button
    const confirmBtn = this.add.text(600, 600, 'A: Correct Option', {
      fontSize: 68,
      fontFamily: 'Arial',
    });
    confirmBtn.setInteractive();
    confirmBtn.on('pointerdown', () => {
      this.correctCards.push(this.selectedCard);
      this.callback();
      this.removeAnsweredCard(this.selectedCard);
      this.navigation(true);
    });

    // Answered wrong button
    const incorrectBtn = this.add.text(600, 700, 'B: Incorrect Option 1', {
      fontSize: 68,
      fontFamily: 'Arial',
    });
    incorrectBtn.setInteractive();
    incorrectBtn.on('pointerdown', () => {
      this.callback();
      this.incorrectCards.push(this.selectedCard);
      this.playerData.replaceCards(this.selectedCard);
      this.removeAnsweredCard(this.selectedCard);
      this.navigation(false);
    });

    // Another answer wrong button
    const incorrectBtn2 = this.add.text(600, 800, 'C: Incorrect Option 2', {
      fontSize: 68,
      fontFamily: 'Arial',
    });
    incorrectBtn2.on('pointerdown', () => {
      this.callback();
      this.incorrectCards.push(this.selectedCard);
      this.playerData.replaceCards(this.selectedCard);
      this.removeAnsweredCard(this.selectedCard);
      this.navigation(false);
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
      countdown: this.countdown,
      mainGameCounter: this.counter,
    });
  }

  // Naivgation from question board to playerAttack
  navigation(correctness) {
    this.closeScenePrep();
    console.log(this.countdown);

    this.scene.add('playerAttack', playerAttack, true, {
      countdown: this.countdown,
      mainGameCounter: this.counter,
      player1: this.player1,
      dojoBoss: this.dojoBoss,
      background: this.background,
      selectedCard: this.selectedCard,
      correctness: correctness,
    });
  }

  // Close the question boards scene
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
