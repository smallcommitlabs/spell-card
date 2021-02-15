import SettingMenu from './gameSetting/settingMenu';
import HealthSystem from './healthBarSystem/HealthSystem';

export default class gamingScene {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;
  }

  buildScene(player1, boss, hasTimer) {
    const { width, height } = this.scene.scale;
    this.scene.add
      .image(width * 0.5, height * 0.5, 'gameBackground')
      // .setScale(0.5)
      .setOrigin(0.5);

    this.cardDeck = this.scene.add.image(1738, 912, 'CardBack').setScale(0.63, 0.58);
    this.cardGraveyard = this.scene.add.image(196, 912, 'CardBack').setScale(0.63, 0.58);

    // Health Bar System
    this.player1HealthSystem = new HealthSystem(
      this.scene,
      width * 0.1,
      height * 0.1,
      player1.getDefenceValue(),
      player1.magicStatus(),
      player1.getHealth(),
      400,
      50,
      true
    );
    this.bossHealthSystem = new HealthSystem(
      this.scene,
      width * 0.65,
      height * 0.1,
      boss.returnBossArmour(),
      0,
      boss.returnBossHealth(),
      400,
      50,
      false
    );
    // player
    this.scene.physics.add
      .sprite(width * 0.2, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    this.scene.physics.add
      .sprite(width * 0.8, height * 0.4, 'player')
      .setOrigin(0.5)
      .setScale(0.15);

    // Layout for boss and player health and armour stats
    this.player1Health = this.scene.add
      .text(width * 0.1, height * 0.1, player1.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.bossHealth = this.scene.add
      .text(width * 0.9, height * 0.1, boss.returnBossHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.player1Armour = this.scene.add
      .text(width * 0.15, height * 0.1, player1.getDefenceValue(), { fontSize: 30 })
      .setOrigin(0.5);

    this.bossArmour = this.scene.add
      .text(width * 0.85, height * 0.1, boss.returnBossArmour(), { fontSize: 30 })
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
  updatePlayer(player1HealthValue, player1ArmourValue) {
    this.player1Health.setText(player1HealthValue);
    this.player1Armour.setText(player1ArmourValue);
  }

  updateBoss(bossHealthValue, bossArmourValue) {
    this.bossHealth.setText(bossHealthValue);
    this.bossArmour.setText(bossArmourValue);
  }

  settingScreen(button, popUpName, popUpInput, key) {
    button.on(
      'pointerdown',
      function () {
        this.scene.add(popUpName, popUpInput, true, {
          object: this,
          key: key,
        });
        // pause the scene
        this.scene.pause(key);
      },
      this.scene
    );
  }

  returnPlayer1Health() {
    return this.player1Health;
  }

  returnBossHealth() {
    return this.bossHealth;
  }

  returnPlayer1Armour() {
    return this.player1Armour;
  }

  returnBossArmour() {
    return this.player2Armour;
  }

  returnPlayerHealthSystem() {
    return this.player1HealthSystem;
  }

  returnBossHealthSystem() {
    return this.bossHealthSystem;
  }

  setDefence(amount) {
    this.player1HealthSystem.setHealth(amount);
  }
}
