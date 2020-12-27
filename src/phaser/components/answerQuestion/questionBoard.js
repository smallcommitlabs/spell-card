import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';

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

    // const tiemrLabel = this.add
    //   .text(width * 0.5, 220, '20', { fontSize: 32 })
    //   .setOrigin(0.5);

    // this.countdown=new CountdownController(this,tiemrLabel);
    // this.countdown.start(this.handleCountdownFinished.bind(this),300000);
  }

  // update(){
  //   this.countdown.update();
  // }

  // handleCountdownFinished(){
  //   this.scene.start('game');
  // }
}
