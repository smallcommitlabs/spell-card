import Deck from './player';
import AttackCard from '../components/Cards/attackCard';
import DefenceCard from '../components/Cards/defenseCard';
import MagicCard from '../components/Cards/magicCard';

export default class cards {
  /** @type {Array} */
  card;

  constructor() {
    if (!!cards.instance) {
      return cards.instance;
    }
    cards.instance = this;
    this.card = new Array();

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
      a++;
    }
  }

  getRandomCard(numOfCards) {
    let i = 0;
    const array = new Array();
    while (numOfCards > 0) {
      const num = Math.floor(Math.random() * this.card.length);
      console.log(num);
      const card = this.card[num];
      console.log(card.getCard().discarded);
      if (!card.getCard().discarded) {
        array[i] = card;
        card.useCard();
        numOfCards--;
        i++;
      }
    }
    return array;
  }
}
