export default class playerStats {
  /**
   *
   * @param {number} health
   */
  constructor(health, armour) {
    this.health = health;
    this.armour = armour;
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
}
