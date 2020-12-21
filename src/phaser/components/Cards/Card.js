export default class Card {
  constructor(name, rank, type, value, imagePath) {
    this.name = name;
    this.rank = rank;
    this.type = type;
    this.value = value;
    this.imagePath = imagePath;
    this.isDiscarded = false;
  }
  useEffect() {}

  useCard() {
    this.isDiscarded = true;
  }

  resetCardUsed() {
    this.isDiscarded = false;
  }

  createSprite(x, y, scene) {
    return scene.physics.add.sprite(x, y, this.name, this.imagePath);
  }
}
