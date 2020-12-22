import Deck from './player';
import AttackCard from '../components/Cards/attackCard';
import DefenceCard from '../components/Cards/defenseCard';
import MagicCard from '../components/Cards/magicCard';

export default class cards {
  /** @type {Array} */
  attackCards;

  /** @type {Array} */
  defenceCard;

  /** @type {Array} */
  magicCard;

  constructor() {
    if (!!cards.instance) {
      return cards.instance;
    }
    cards.instance = this;
    this.attackCards = new Array();
    this.defenceCard = new Array();
    this.magicCard = new Array();

    return this;
  }

  loadCard() {
    let a = 0;
    let j = 0;
    let z = 0;
    for (const i of Deck.card) {
      let card = null;
      if (i.class === 'Attack') {
        console.log(i.class);
        card = new AttackCard(i);
        this.attackCards[a] = card;
        a++;
      } else if (i.class === 'Defence') {
        card = new DefenceCard(i);
        this.defenceCard[j] = card;
        j++;
      } else if (i.class === 'Magic') {
        card = new MagicCard(i);
        this.magicCard[z] = card;
        z++;
      }
    }
  }

  getRandomCard(numOfCards) {
    return this.magicCard[0];
  }
}
