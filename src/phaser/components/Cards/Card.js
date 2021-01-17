export default class Card {
  constructor(cardInform) {
    this.cardInform = cardInform;
    this.isSelected = false;
  }
  useEffect() {}

  // return if the card is been selected
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

  // Return the card information array
  getCard() {
    return this.cardInform;
  }

  // Check if the card is been selected
  getSelectedInfo() {
    return this.isSelected;
  }

  setCardSelectedStatus(status) {
    this.isSelected = status;
  }

  // Add or remove tint from card
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
