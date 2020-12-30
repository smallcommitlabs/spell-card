import Phaser from 'phaser';
import SettingMenu from '../../components/gameSetting/settingMenu';

export default class roundResult extends Phaser.Scene {
  init(data) {
    // console.log(data);
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
    this.cards = data.cards;
  }

  constructor() {
    super('roundResult');
  }

  create() {
    console.log(this.scene);
    const { width, height } = this.scale;
    this.add
      .image(width * 0.5, height * 0.5, 'gameBackground')
      .setScale(0.5)
      .setOrigin(0.5);

    this.cardDeck = this.add.image(869, 456, 'CardBack').setScale(0.315, 0.28);
    this.cardGraveyard = this.add.image(98, 456, 'CardBack').setScale(0.315, 0.28);

    // Setting button setup
    const settingBtn = this.add
      .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
      .setOrigin(0.5)
      .setInteractive();
    this.popUpScreen(settingBtn, 'setting', SettingMenu);

    // player
    this.physics.add
      .sprite(width * 0.2, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    this.physics.add
      .sprite(width * 0.8, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    // Health
    this.add
      .text(width * 0.1, height * 0.1, this.player1Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.add
      .text(width * 0.9, height * 0.1, this.player2Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
  }

  update() {}

  // Creates the pop-up screen
  popUpScreen(button, popUpName, popUpInput, data) {
    button.on(
      'pointerdown',
      function () {
        this.scene.add(popUpName, popUpInput, true, {
          object: this,
          key: 'roundResult',
        });
        // hide the timer
        // pause the scene
        this.scene.pause('roundResult');
      },
      this
    );
  }
}
