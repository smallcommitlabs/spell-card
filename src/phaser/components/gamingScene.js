import SettingMenu from './gameSetting/settingMenu';

export default class gamingScene {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;
  }

  buildScene(player1Health, player2Health, hasTimer) {
    const { width, height } = this.scene.scale;
    this.scene.add
      .image(width * 0.5, height * 0.5, 'gameBackground')
      // .setScale(0.5)
      .setOrigin(0.5);

    this.cardDeck = this.scene.add.image(1738, 912, 'CardBack').setScale(0.63, 0.58);
    this.cardGraveyard = this.scene.add.image(196, 912, 'CardBack').setScale(0.63, 0.58);

    // player
    this.scene.physics.add
      .sprite(width * 0.2, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    this.scene.physics.add
      .sprite(width * 0.8, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    this.scene.add
      .text(width * 0.1, height * 0.1, player1Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.scene.add
      .text(width * 0.9, height * 0.1, player2Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);

    if (!hasTimer) {
      // Setting button setup
      const settingBtn = this.scene.add
        .text(width * 0.5, height * 0.17, 'Setting', { fontSize: 24 })
        .setOrigin(0.5)
        .setInteractive();
      this.settingScreen(settingBtn, 'setting', SettingMenu);
    }
  }

  settingScreen(button, popUpName, popUpInput, key) {
    button.on(
      'pointerdown',
      function () {
        this.scene.scene.add(popUpName, popUpInput, true, {
          object: this,
          key: key,
        });
        // hide the timer
        this.timerLabel.visible = false;
        // pause the scene
        this.scene.pause(key);
      },
      this
    );
  }
}
