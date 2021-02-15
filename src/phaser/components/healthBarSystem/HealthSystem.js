import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class healthSystem {
  constructor(scene, x, y, hp, height, width, left) {
    const colour = '0x63E563';
    this.width = width;
    this.x = x;
    this.y = y;
    this.defence = 0;
    this.magic = 0;
    this.left = left;
    this.scene = scene;

    this.hp = new HealthBar(scene, x + 100, y, hp, colour, height, width);

    this.create();
  }

  create() {
    let relativeX = this.x;
    if (!this.left) {
      relativeX += this.width + 470;
    }

    this.defence = this.scene.add
      .text(relativeX + 80, this.y + 30, this.defence, { fontSize: 30 })
      .setOrigin(0.5);

    this.magic = this.scene.add
      .text(relativeX, this.y + 30, this.magic, { fontSize: 30 })
      .setOrigin(0.5);
  }

  getMagic() {
    return this.magic;
  }

  getDefence() {
    return this.defence;
  }

  increaseMagic(amount) {
    this.magic += amount;
  }

  increaseDefence(amount) {
    this.defence += amount;
  }

  decreaseMagic(amount) {
    this.magic -= amount;
  }

  decreaseDefence(amount) {
    this.defence -= amount;
  }

  setHealth(amount) {
    this.hp.decrease(amount);
  }
}
