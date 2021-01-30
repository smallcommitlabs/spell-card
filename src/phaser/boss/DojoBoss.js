import Boss from './Boss';

export default class DojoBoss extends Boss {
  constructor(health, armour, name) {
    super(health, armour, name);
  }

  attack() {
    if (this.health > 20) {
      return 2;
    } else {
      return 5;
    }
  }
}
