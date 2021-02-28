import SettingMenu from './gameSetting/settingMenu';
import HealthSystem from './healthBarSystem/HealthSystem';

export default class gamingScene {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;
    this.playerHealthValue = 30;
    this.bossHealthValue = 60;
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

    const xpos = 120;
    const ypos = height * 0.15;

    // Health System
    this.player1HealthSystem = new HealthSystem(
      this.scene,
      xpos,
      ypos,
      0,
      0,
      this.playerHealthValue,
      530,
      55,
      true
    );
    this.bossHealthSystem = new HealthSystem(
      this.scene,
      width - xpos,
      ypos,
      0,
      0,
      this.bossHealthValue,
      530,
      55,
      false
    );

    // player animation
    this.playerModel = this.scene.add.sprite(370, 550, 'playerModel', 0).setScale(0.5);
    this.makeAnims();
    this.playerModel.play('idle');

    // boss model animation
    this.bossModel = this.scene.add.sprite(1500, 470, 'playerModel', 0).setScale(0.8);
    this.bossModel.flipX = true;
    this.bossModel.play('idle');

    // shield animation
    this.smallShield = this.scene.add.sprite(375, 560, 'shieldSmall', 0).setScale(0.5);
    this.bigShield = this.scene.add.sprite(375, 560, 'shieldLarge', 0).setScale(0.5);
    this.smallShield.alpha = 0;
    this.bigShield.alpha = 0;

    // Layout for boss and player health and armour stats
    this.player1Health = this.scene.add
      .text(230, ypos + 38, player1.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.player1Health.setStroke('#000000', 3);
    this.bossHealth = this.scene.add
      .text(width - 230, ypos + 38, boss.returnBossHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.bossHealth.setStroke('#000000', 3);
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
      this.settingScreen(settingBtn, 'setting', SettingMenu, this.key);
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

  makeAnims() {
    this.scene.anims.create({
      key: 'idle',
      repeat: -1,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNames('playerModel', {
        start: 1,
        end: 12,
        zeroPad: 0,
        prefix: 'playerIdle (',
        suffix: ').png',
      }),
    });
    this.scene.anims.create({
      key: 'idle2',
      repeat: 0,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNames('playerModel', {
        start: 1,
        end: 12,
        zeroPad: 0,
        prefix: 'playerIdle (',
        suffix: ').png',
      }),
    });
    this.scene.anims.create({
      key: 'attack',
      repeat: 0,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNames('playerModel', {
        start: 13,
        end: 33,
        zeroPad: 0,
        prefix: 'playerAttack (',
        suffix: ').png',
      }),
    });
    this.scene.anims.create({
      key: 'defence',
      repeat: 0,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNames('playerModel', {
        start: 13,
        end: 31,
        zeroPad: 0,
        prefix: 'playerDefend (',
        suffix: ').png',
      }),
    });
    this.scene.anims.create({
      key: 'magic',
      repeat: 0,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNames('playerModel', {
        start: 15,
        end: 35,
        zeroPad: 0,
        prefix: 'playerMagic (',
        suffix: ').png',
      }),
    });
  }

  playAttack() {
    this.playerModel.play('attack');
    this.bossModel.tint = 0xff0000;
  }

  playDefence() {
    this.playerModel.play('defence');
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.scene.tweens.add({
          targets: this.smallShield,
          alpha: 1,
          duration: 500,
          repeat: 0,
        });
        this.scene.tweens.add({
          targets: this.bigShield,
          alpha: 0.7,
          duration: 500,
          repeat: 0,
        });
      },
    });
  }

  playMagic() {
    this.playerModel.play('magic');
  }

  playSelfDamage() {
    this.playerModel.tint = 0xff0000;
    this.playerModel.play('idle2');
  }

  returnPlayer() {
    return this.playerModel;
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
}
