import Phaser from 'phaser';
import CountdownController from '../../components/countdownController';
import playerData from '../../player/playerData';

export default class setting extends Phaser.Scene {
  init(data) {
    this.mainGame = data;
    this.mainGameCounter = data.counter;
    this.mainGameTimerLabel = data.timerLabel;
    this.key = data.key;
  }

  constructor() {
    super('gameSetting');
    this.playerData = new playerData();
  }

  create() {
    const { width, height } = this.scale;

    // this.cameras.main.backgroundColor.setTo(106,78,86);
    // let rt = this.add.renderTexture(0, 0, width, height).setOrigin(0);

    const retangle = this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);
    retangle.alpha = 0.5;
    const surrender = this.add.text(600, 600, 'Surrender', { fontSize: 48 }).setInteractive();

    if (this.mainGameCounter) {
      this.timerSettup(width);
    }

    surrender.on('pointerdown', () => {
      this.scene.remove('gameSetting');
      this.scene = this.mainGame.object.scene;
      this.playerData.refreshDecks();
      this.scene.start('mainMenu');
    });

    const close = this.add.text(200, 200, 'X', { fontSize: 60 }).setInteractive();
    close.on(
      'pointerdown',
      () => {
        this.navigation();
      },
      this
    );
  }

  update() {
    if (this.mainGameCounter) {
      this.countdown.update();
    }
  }

  handleCountdownFinished() {
    this.navigation();
  }

  timerSettup(width) {
    const timerLabel = this.add.text(width * 0.5, 150, '5:00', { fontSize: 32 }).setOrigin(0.5);
    const timeRemain = this.mainGameCounter.getRemain();
    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), timeRemain);
  }

  navigation() {
    this.scene.remove('gameSetting');
    this.scene = this.mainGame.object.scene;
    if (this.mainGameCounter) {
      this.mainGameTimerLabel.visible = true;
      this.scene.resume(this.key, {
        counter: this.countdown,
        mainGameCounter: this.mainGameCounter,
      });
    } else {
      this.scene.resume(this.key);
    }
  }
}
