export default class Card {
  constructor(cardInform) {
    this.cardInform = cardInform;
  }
  useEffect() {}

  useCard() {
    this.cardInform.isDiscarded = true;
  }

  resetCardUsed() {
    this.cardInform.isDiscarded = false;
  }

  createSprite(x, y, scene) {
    return scene.physics.add.sprite(x, y, this.cardInform, this.cardInform);
  }

  getCard() {
    return this.cardInform;
  }
}
