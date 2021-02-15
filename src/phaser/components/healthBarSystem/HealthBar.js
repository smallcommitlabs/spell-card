import Phaser from 'phaser';

export default class HealthBarComponent {
  constructor(scene, x, y, value, colour, height, width) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.value = value;
    this.colour = colour;
    this.p = (width - 4) / value;

    this.bar = this.scene.add.graphics();
    this.draw();
  }

  decrease(amount) {
    this.value -= amount;
    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return this.value === 0;
  }

  draw() {
    this.bar.clear();

    // BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.height, this.width);

    // Health
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.height - 4, this.width - 4);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    const d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, this.height - 4, d);
  }
}
