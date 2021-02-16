export default class HealthBarComponent {
  constructor(scene, x, y, value, colour, width, height, left) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.value = value;
    this.colour = colour;
    this.left = left;
    this.p = (width - 4) / value;
    console.log(this.p, '', value);

    this.bar = this.scene.add.graphics();
    this.draw();
  }

  setHealth(amount) {
    this.value = amount;
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
    this.bar.fillRect(this.x, this.y, this.width, this.height);

    // Health
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);

    const d = Math.floor(this.p * this.value);
    this.bar.fillStyle(this.colour);

    if (this.left) {
      this.bar.fillRect(this.x + 2, this.y + 2, d, this.height - 4);
    } else {
      console.log('in');
      console.log(this.value, d, this.p);
      const x = this.width + this.x - 2;
      this.bar.fillRect(x, this.y + 2, -d, this.height - 4);
    }
  }
}
