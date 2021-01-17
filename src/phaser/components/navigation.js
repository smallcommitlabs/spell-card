export default class navigation {
  constructor(scene) {
    this.scene = scene;
  }

  /**
   * @param {String}  sceneToNaviTo
   * @param {Phaser.Scene} scene
   * @param {Phaser.GameObjects.Image} component
   */
  navigationToScene(sceneToNaviTo, component) {
    this.sceneToNaviTo = sceneToNaviTo;
    this.component = component;

    const button = this.component.setInteractive();
    button.on('pointerdown', this.mouseClick, this);
  }

  mouseClick() {
    this.scene.scene.start(this.sceneToNaviTo);
  }

  custNavigationToScene(btn, custFunc) {
    btn.setInteractive();
    btn.on('pointerdown', custFunc, this);
  }
}
