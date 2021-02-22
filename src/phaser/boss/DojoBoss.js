import Boss from './Boss';

export default class DojoBoss extends Boss {
  constructor(health, armour, name) {
    super(health, armour, name);
    this.moveset = ['attack', 'shield'];
  }

  randomAttack() {
    const min = 0;
    const max = 10;
    if (Math.random() * (max - min) + min > 4) {
      const randomMove = this.moveset[Math.floor(Math.random() * this.moveset.length)];
      if (randomMove == 'attack') {
        return this.attack();
      } else if (randomMove == 'shield') {
        return this.defense();
      }
    } else {
      return 0;
    }
  }

  // Attacks the enemy with 2 damage but when below 33% health deals 5 damage instead
  attack() {
    if (this.health > 20) {
      return 2;
    } else {
      return 5;
    }
  }

  // Increases the bots armour
  defense() {
    this.armour += 2;
    return 0;
  }
}
