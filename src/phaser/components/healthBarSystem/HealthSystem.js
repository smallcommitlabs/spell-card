import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class healthSystem {
  constructor(scene, x, y, defence, magic, hp, height, width, left) {
    this.width = width;
    this.x = x;
    this.y = y;
    this.defence = defence;
    this.magic = magic;
    this.scene = scene;
    this.left = left;

    const colour = '0x63E563';
    let xHealth = x + 100;
    if (!left) {
      xHealth = x - 630;
    }
    this.hp = new HealthBar(this.scene, xHealth, this.y - 50, hp, colour, height, width, left);

    this.create();
  }

  create() {
    // IconBoarder
    this.scene.add.image(this.x, this.y, 'iconBoarder').setScale(0.35).setOrigin(0.5);

    // x position pf the armour
    let xArmour = 0;
    let xArmourText = 0;

    // Create mirrored healthSystem
    if (!this.left) {
      xArmour = this.x + 56;
      xArmourText = this.x + 56;
    } else {
      this.scene.add
        .image(this.x + 56, this.y + 40, 'magic')
        .setScale(0.35)
        .setOrigin(0.5);
      this.magicText = this.scene.add
        .text(this.x + 57, this.y + 38, '40', { fontSize: 35 })
        .setOrigin(0.5);
      xArmour = this.x - 56;
      xArmourText = this.x - 55;
      // this.defenceText.setFontStyle('bold');
      this.magicText.setStroke('#FFFFFF', 2);
    }

    // Add armour icon and text
    this.scene.add
      .image(xArmour, this.y + 25, 'armour')
      .setScale(0.35)
      .setOrigin(0.5);
    this.defenceText = this.scene.add
      .text(xArmourText, this.y + 36, '40', { fontSize: 35 })
      .setOrigin(0.5);
    this.defenceText.setStroke('#FFFFFF', 2);
  }

  getMagic() {
    return this.magic;
  }

  getArmour() {
    return this.defence;
  }

  setArmour(amount) {
    // this.defence = amount;
    // this.defenceText.setText(this.defence);
  }

  setMagic(amount) {
    // this.magic = amount;
    // this.magicText.setText(this.magic);
  }

  setHealth(amount) {
    this.hp.setHealth(amount);
  }
}
