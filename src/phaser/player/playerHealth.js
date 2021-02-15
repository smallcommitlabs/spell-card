export default class playerStats {
  /**
   *
   * @param {number} health
   */
  constructor(health, armour, magic) {
    this.health = health;
    this.armour = armour;
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

  addDefence(value) {
    this.armour += value;
  }

  reduceDefence(value) {
    this.armour -= value;
    if (this.armour <= 0) {
      this.armour = 0;
    }
  }

  getDefenceValue() {
    return this.armour;
  }

  changeMagicStatus(magic) {
    this.magic = this.magic + magic;
  }

  magicStatus() {
    return this.magic;
  }
}
