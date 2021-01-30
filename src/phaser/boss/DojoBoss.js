import Boss from './Boss';

export default class DojoBoss extends Boss {
  constructor(health, armour, name) {
    super(health, armour, name);
  }

  randomAttack() {
    const min = 0;
    const max = 10;
    if (Math.random * (max - min) + min > 3) {
      this.attack();
    } else {
      return 0;
    }
  }

  attack() {
    if (this.health > 20) {
      return 2;
    } else {
      return 5;
    }
  }
}
