import Phaser from 'phaser';
import NavigationButton from '../../components/naviButton';
import countdownController from '../../components/countdownController';
import playerData from '../../player/playerData';
import Card from '../../components/Cards/Card';

export default class cardSwich extends Phaser.Scene {
  /** @type {CountdownController} */
  countdown;

  constructor() {
    super('cardSwitch');
    this.navigation = new NavigationButton(this);
    this.givenCards = new Array();
    this.process = new playerData();
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

    this.countdown.start(this.handleCountdownFinished.bind(this), 20000);

    this.navigation.createSpecialButton(width * 0.5, height * 0.9, 24, 'Done', () => {
      this.countdown.stop();
      this.scene.start('game');
    });

    this.givenCards = this.process.getRandomCards(5);
    console.log(this.givenCards);
    this.cardHandler(width, height);

    /**
     * This adds a new button to confirm the selection of a specific card to swap.
     * If the boolean selection is confirmed, the card will be readded back to the
     * randomCardList.
     */
    this.navigation.createSpecialButton(width * 0.5, height * 0.85, 24, 'Confirm', () => {
      for (let i = 0; i < this.givenCards.length; i++) {
        if (this.givenCards[i].isSelected) {
          this.process.replaceCards(this.givenCards[i]);
        }
      }
      console.log(this.givenCards);
      // Re-shuffle the cards as the cards returned are added to the back of the array.
      this.process.createRandomCardList();
      this.countdown.stop();
      this.scene.start('game');
    });
  }

  update() {
    this.countdown.update();
  }

  handleCountdownFinished() {
    this.scene.start('game');
  }

  cardHandler(width, height) {
    console.log('I have reacted');
    let card;
    let cardNumber = 1;
    const x = width * 0.2 - 35;
    const y = height * 0.5;
    for (let i = 0; i < this.givenCards.length; i++) {
      // Select the image for the card here
      console.log(this.givenCards[i].getCard().image);
      card = this.add
        .sprite(x * cardNumber, y, this.givenCards[i].getCard().image.toString())
        .setScale(0.15, 0.133)
        .setInteractive();
      cardNumber++;

      this.givenCards[i].clickedStatus(card);
    }
  }
}
