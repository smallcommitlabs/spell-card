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
  }

  decreaseArmour(damage) {
    return this.armour - damage;
  }
}
