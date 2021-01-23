import AttackCard from '../components/Cards/attackCard';
import DefenceCard from '../components/Cards/defenseCard';
import MagicCard from '../components/Cards/magicCard';

export default class cardProcess {
  constructor() {}

  loadCard(deck) {
    let a = 0;
    let cardDeck = new Array();
    for (const i of deck) {
      let card = null;
      if (i.class === 'Attack') {
        card = new AttackCard(i);
      } else if (i.class === 'Defence') {
        card = new DefenceCard(i);
      } else if (i.class === 'Magic') {
        card = new MagicCard(i);
      }
      cardDeck[a] = card;
      a++;
    }
    return cardDeck;
  }

  createRandomCardList(randomCards) {
    let currentIndex = randomCards.length,
      randomCardShuffle = randomCards,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = randomCardShuffle[currentIndex];
      randomCardShuffle[currentIndex] = randomCardShuffle[randomIndex];
      randomCardShuffle[randomIndex] = temporaryValue;
    }
    return randomCardShuffle;
  }

  getRandomCards(num, randomCards) {
    let returnedCards = new Array();
    let i = 0;

    if (num > randomCards.length) {
      returnedCards = Array.from(randomCards);
      return returnedCards;
    }

    for (let j = randomCards.length - 1; j >= randomCards.length; j--) {
      if (i < 0) break;
      returnedCards[i] = randomCards[j];
      i++;
    }
    // remember to decrease randomCards array length with randomCards.length = randomCards.length - num
    return returnedCards;
  }

  replaceCards(replaced, deck) {
    deck.push(replaced);
    return replaced;
  }

  getCardRemainNumber(deck) {
    return deck.length;
  }

  botChance(cards) {
    const botCorrectCards = new Array();
    const min = 0;
    const max = 10;
    for (const i of cards) {
      if (Math.random() * (max - min) + min > 3) {
        botCorrectCards.push(i);
      }
    }
    return botCorrectCards;
  }
}
