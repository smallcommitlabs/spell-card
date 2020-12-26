import Deck from './player';
import AttackCard from '../components/Cards/attackCard';
import DefenceCard from '../components/Cards/defenseCard';
import MagicCard from '../components/Cards/magicCard';

export default class cards {
  /** @type {Array} */
  card;
  randomCards;
  discardedCards;

  constructor() {
    if (!!cards.instance) {
      return cards.instance;
    }
    cards.instance = this;
    this.card = new Array();
    this.randomCards = new Array();
    this.discardedCards = new Array();
    return this;
  }

  loadCard() {
    let a = 0;

    for (const i of Deck.card) {
      let card = null;
      if (i.class === 'Attack') {
        card = new AttackCard(i);
      } else if (i.class === 'Defence') {
        card = new DefenceCard(i);
      } else if (i.class === 'Magic') {
        card = new MagicCard(i);
      } else {
        console.log('none');
      }
      this.card[a] = card;
      this.randomCards[a] = card;
      a++;
    }
    console.log(this.card);
  }

  /**
   * This method gets the randomCards list and shuffles all the cards in the array
   */
  createRandomCardList() {
    let currentIndex = this.randomCards.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.randomCards[currentIndex];
      this.randomCards[currentIndex] = this.randomCards[randomIndex];
      this.randomCards[randomIndex] = temporaryValue;
    }

    return this.randomCards;
  }

  /**
   * This method gets the last cards from the randomCards array and places them
   */
  getRandomCards(numOfCards) {
    const returnedCards = new Array();
    let j = 0;
    for (let i = this.randomCards.length - 1; i >= this.randomCards.length - numOfCards; i--) {
      console.log('yeet');
      // If the wanted index is smaller than 0, then the deck has ended.
      if (i < 0) break;
      returnedCards[j] = this.randomCards[i];
      j++;
    }
    // Change the length of the deck and remove the cards that have been added to hand
    this.randomCards.length = this.randomCards.length - numOfCards;
    return returnedCards;
  }

  // At the start of the game if the user wants to return their cards, this will readd the card to randomCards.
  replaceCards(readdedCard) {
    this.randomCards.add(readdedCard);
  }
}
