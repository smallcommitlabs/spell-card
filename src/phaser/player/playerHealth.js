export default class playerHealth {
  /**
   *
   * @param {number} health
   */
  constructor(health, magic) {
    this.health = health;
    this.magic = magic;
  }

  getHealth() {
    return this.health;
  }

  /**
   *
   * @param {number} damage
   */
  dealDamage(damage) {
    this.health -= damage;
  }

  changeMagicStatus(magic) {
    this.magic = this.magic + magic;
  }

  magicStatus() {
    return this.magic;
  }
}
