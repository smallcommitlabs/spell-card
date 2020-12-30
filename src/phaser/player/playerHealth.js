export default class playerHealth {
  /**
   *
   * @param {number} health
   */
  constructor(health) {
    this.health = health;
  }

  getHealth() {
    return this.health;
  }

  /**
   *
   * @param {number} damage
   */
  setHealth(damage) {
    this.health -= damage;
  }
}
