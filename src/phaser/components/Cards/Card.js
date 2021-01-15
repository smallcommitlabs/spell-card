export default class Card {
  constructor(cardInform) {
    this.cardInform = cardInform;
    this.isSelected = false;
  }
  useEffect() {}

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

  getSelectedInfo() {
    return this.isSelected;
  }

  setCardSelectedStatus(status) {
    this.isSelected = status;
  }

  clickedStatus(cardBtn, cardObj) {
    cardBtn.on('pointerdown', function (pointer) {
      if (!cardObj.isSelected) {
        cardObj.setCardSelectedStatus(true);
        cardBtn.setTint(0xff0000);
      } else {
        cardObj.setCardSelectedStatus(false);
        cardBtn.clearTint();
      }
    });
  }
}
