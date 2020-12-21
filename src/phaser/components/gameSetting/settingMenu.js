import Phaser from 'phaser';

export default class setting extends Phaser.Scene {
  init(data) {
    this.mainGame = data;
  }

  constructor() {
    super('gameSetting');
  }

  create() {
    const { width, height } = this.scale;
    console.log(width);

    // this.cameras.main.backgroundColor.setTo(106,78,86);
    // let rt = this.add.renderTexture(0, 0, width, height).setOrigin(0);
    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;
    const surrender = this.add.text(300, 300, 'Surrender', { fontSize: 24 }).setInteractive();

    surrender.on('pointerdown', () => {
      this.scene.remove('gameSetting');
      this.scene = this.mainGame.object.scene;
      this.scene.start('mainMenu');
    });

    const close = this.add.text(200, 200, 'X', { fontSize: 30 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.scene.remove('gameSetting');
        console.log(this.scene);
        console.log(this.mainGame);
        this.scene = this.mainGame.object.scene;
        this.scene.resume('game');
      },
      this
    );
  }

  update() {}
}
