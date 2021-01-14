import Phaser from 'phaser';
export default class zone {
  /** @type {Phaser.GameObjects} */
  gameObject;

  /**
   * @param {Phaser.GameObjects} gameObject
   */
  constructor(gameObject) {
    this.gameObject = gameObject;
  }

  creactZone(x, y, width, height) {
    const zone = this.gameObject.add.zone(x, y, width, height);
    this.outLine(zone);
    return zone;
  }

  outLine(zone) {
    const graphics = this.gameObject.add.graphics();
    graphics.lineStyle(2, 0xffffff, 1);

    //  32px radius on the corners
    graphics.strokeRoundedRect(zone.x, zone.y, zone.width, zone.height, 32);
  }
}
