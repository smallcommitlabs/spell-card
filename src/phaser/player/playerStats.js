export default class playerHealth {
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
    this.defenceValue += value;
  }

  reduceDefence(value) {
    this.defenceValue -= value;
    if (this.defenceValue <= 0) {
      this.defenceValue = 0;
    }
  }

  getDefenceValue() {
    return this.defenceValue;
  }
}
