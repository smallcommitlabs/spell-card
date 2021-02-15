import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class healthSystem {
  constructor(scene, x, y, defence, magic, hp, height, width, left) {
    const colour = '0x63E563';
    this.width = width;
    this.x = x;
    this.y = y;
    this.defence = defence;
    this.magic = magic;
    this.left = left;
    this.scene = scene;

    this.hp = new HealthBar(scene, x + 100, y, hp, colour, height, width);

    this.create();
  }

  create() {
    let relativeX = this.x;
    if (!this.left) {
      relativeX += this.width + 470;
    } else {
      this.magicText = this.scene.add
        .text(relativeX, this.y + 30, this.magic, { fontSize: 30 })
        .setOrigin(0.5);
    }

    this.defenceText = this.scene.add
      .text(relativeX + 80, this.y + 30, this.defence, { fontSize: 30 })
      .setOrigin(0.5);
  }

  getMagic() {
    return this.magic;
  }

  getArmour() {
    return this.defence;
  }

  setArmour(amount) {
    this.defence = amount;
    this.defenceText.setText(this.defence);
  }

  setMagic(amount) {
    this.magic = amount;
    this.magicText.setText(this.magic);
  }

  setHealth(amount) {
    this.hp.setHealth(amount);
  }
}
