export default class Card {
  constructor(cardInform) {
    this.cardInform = cardInform;
    this.isSelected = false;
  }
  useEffect() {}

  selectCard() {
    this.isSelected = true;
  }

  deselectCard() {
    this.isSelected = false;
  }

  isSelected() {
    return this.isSelected;
  }
  useCard() {
    this.cardInform.discarded = true;
  }

  resetCardUsed() {
    this.cardInform.discarded = false;
  }

  createSprite(x, y, scene) {
    return scene.physics.add.sprite(x, y, this.cardInform, this.cardInform);
  }

  getCard() {
    return this.cardInform;
  }

  clickedStatus(card) {
    card.on('pointerdown', function (pointer) {
      if (!card.isSelected) {
        this.isSelected = true;
        card.setTint(0xff0000);
      } else {
        this.isSelected = false;
        card.clearTint();
      }
    });
  }
}
