import Deck from './player';
import AttackCard from '../components/Cards/attackCard';
import DefenceCard from '../components/Cards/defenseCard';
import MagicCard from '../components/Cards/magicCard';

export default class cards {
  /** @type {Map} */
  cards;

  constructor() {
    if (!!cards.instance) {
      return cards.instance;
    }
    cards.instance = this;
    this.cards = new Map();

    return this;
  }

  loadCard() {
    // console.log(deck.card[0]);
    for (const i of Deck.card) {
      let card = null;
      if (i.class === 'Attack') {
        card = new AttackCard(i);
      } else if (i.class === 'Defence') {
        card = new DefenceCard(i);
      } else if (i.class === 'Magic') {
        card = new MagicCard(i);
      }
      this.cards.set(i.name, card);
    }
  }

  getCard() {
    return this.cards;
  }
}
