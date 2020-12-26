import Phaser from 'phaser';

export default class questionBoard extends Phaser.Scene {
  init(data) {
    this.mainGame = data;
  }

  constructor() {
    super('questionBoard');
  }

  create() {
    const { width, height } = this.scale;

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;

    this.add.text(300, 300, 'Answer question.....', { fontSize: 21 });

    const close = this.add.text(200, 200, 'X', { fontSize: 30 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.scene.remove('questionBoard');
        console.log(this.scene);
        console.log(this.mainGame);
        this.scene = this.mainGame.object.scene;
        this.scene.resume('game');
      },
      this
    );
  }
}
