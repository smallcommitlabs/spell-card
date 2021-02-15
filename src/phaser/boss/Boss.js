export default class Boss {
  constructor(health, armour, name) {
    this.health = health;
    this.armour = armour;
    this.name = name;
  }

  returnBossHealth() {
    return this.health;
  }

  returnBossArmour() {
    return this.armour;
  }

  decreaseHealth(damage) {
    this.health = this.health - damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  decreaseArmour(damage) {
    this.armour = this.armour - damage;
    if (this.armour < 0) {
      this.armour = 0;
    }
  }
}
