import Phaser from 'phaser';
import NavigationButton from '../../components/naviButton';
import countdownController from '../../components/countdownController';
import playerData from '../../player/playerData';

export default class cardSwich extends Phaser.Scene {
  /** @type {CountdownController} */
  countdown;

  constructor() {
    super('cardSwitch');
    this.navigation = new NavigationButton(this);
    this.givenCards = new Array();
    this.process = new playerData();
    this.botCards = new Array();
    this.botProcess = new playerData();
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width * 0.5, height * 0.1, 'Please Switch a Card', { fontSize: 32 })
      .setOrigin(0.5);

    const timerLabel = this.add
      .text(width * 0.5, height * 0.2, '20', { fontSize: 42 })
      .setOrigin(0.5);

    this.countdown = new countdownController(this, timerLabel);

    this.countdown.start(this.handleCountdownFinished.bind(this), 50000);

    this.givenCards = this.process.getRandomCards(5);

    this.botCards = this.botProcess.getRandomCards(5);

    this.cardHandler(width, height);

    // replace the given cards properly into the array and it is stored within this.givenCards

    /**
     * This adds a new button to confirm the selection of a specific card to swap.
     * If the boolean selection is confirmed, the card will be readded back to the
     * randomCardList.
     */
    this.navigation.createSpecialButton(width * 0.5, height * 0.85, 24, 'Confirm', () => {
      let cardsReplaced = 0;
      let cardsKept = 0;
      let replacementCards = new Array();
      // THis is not working because this.givenCards[i] is not referencing the same isSelected and does not change
      // in this instance itself i think and only in the card class instance or something like that

      for (const i of this.givenCards) {
        if (i.isSelected) {
          this.process.replaceCards(i);
          cardsReplaced++;
        } else {
          replacementCards[cardsKept] = i;
          cardsKept++;
        }
      }
      this.process.createRandomCardList();

      replacementCards = replacementCards.concat(this.process.getRandomCards(cardsReplaced));
      // Re-shuffle the cards as the cards returned are added to the back of the array.
      this.process.createRandomCardList();
      this.countdown.stop();
      this.scene.start('game', {
        selectedCards: replacementCards,
        selectedBotCards: this.botCards,
        botProcess: this.botProcess,
      });
    });
  }

  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {
    this.scene.start('game', { selectedCards: this.givenCards });
  }

  cardHandler(width, height) {
    let cardNumber = 1;
    const x = width * 0.2 - 35;
    const y = height * 0.5;
    for (const i of this.givenCards) {
      const card = this.add
        .image(x * cardNumber, y, i.getCard().image)
        .setScale(0.15, 0.133)
        .setInteractive();
      cardNumber++;
      i.clickedStatus(card, i);
    }
  }
}
