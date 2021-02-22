import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';

export default class playerAttack extends Phaser.Scene {
  init(data) {
    this.player1 = data.player1;
    this.dojoBoss = data.dojoBoss;
    this.background = data.background;
    this.currentCard = data.selectedCard;
    this.correctness = data.correctness;
    this.countdown = data.countdown;
    this.mainGameCounter = data.mainGameCounter;
  }

  constructor() {
    super('playerAttack');
    console.log('playerAttack');
    this.gamingScene = new GamingScene(this, 'playerAttack');
  }

  create() {
    const { width, height } = this.scale;
    this.gamingScene.buildScene(this.player1, this.dojoBoss, false);

    // Set up magic health and defence
    this.playerHealthSystem = this.gamingScene.returnPlayerHealthSystem();
    this.bossHealthSystem = this.gamingScene.returnBossHealthSystem();

    this.setPlayerNBossHealthSystem(this.playerHealthSystem, this.bossHealthSystem);

    this.processCard(width, height);

    console.log(this.player1.getHealth(), ' ', this.dojoBoss.returnBossHealth());
  }

  update() {
    // update boss health;
    this.background.updateBoss(this.dojoBoss.returnBossHealth(), this.dojoBoss.returnBossArmour());

    // Get the HealthSystem object for the player and boss
    this.player1HealthSystem = this.background.returnPlayerHealthSystem();
    this.dojoHealthSystem = this.background.returnBossHealthSystem();

    // If the animation finished
    if (!this.timeline.isPlaying()) {
      // If the the player health is equal 0 or no more cards, switch to gameResult
      // Else restart a new round

      if (this.player1.getHealth() <= 0 || this.dojoBoss.returnBossHealth() <= 0) {
        this.scene.start('gameResult', {
          player1: this.player1,
          dojoBoss: this.dojoBoss,
        });
        this.scene.remove('gameSetting');
      } else {
        // update health, magic and defence
        this.setPlayerNBossHealthSystem(this.player1HealthSystem, this.dojoHealthSystem);

        this.dojoHealthSystem.setHealth(this.dojoBoss.returnBossHealth());
        this.dojoHealthSystem.setArmour(this.dojoBoss.returnBossArmour());

        this.player1HealthSystem.setHealth(this.player1.getHealth());
        this.player1HealthSystem.setArmour(this.player1.getDefenceValue());
        this.player1HealthSystem.setMagic(this.player1.magicStatus());

        this.scene.remove('gameSetting');
        this.scene.remove('playerAttack');
        this.scene.resume('game', {
          player1: this.player1,
          dojoBoss: this.dojoBoss,
          countdown: this.countdown,
          mainGameCounter: this.mainGameCounter,
        });
      }
    }
  }

  // Add animation and effects for correctCards
  processCard(width, height) {
    this.timeline = this.tweens.createTimeline();

    const card = this.currentCard.getCard();
    const cardClass = card.class;
    const rank = card.rank;
    const image = card.image;

    // Target that the animation is aiming at
    const target = this.add
      .image(width * 0.2 + 50, height * 0.4, image)
      .setOrigin(0.5)
      .setScale(0.15);

    // correct and incorrect card animations
    if (this.correctness) {
      this.timeline.add({
        targets: target,
        x: 1400,
        onStart: this.onStart.bind(this, target),
        ease: 'Power0',
        duration: 2000,
        onComplete: this.action.bind(this, cardClass, rank, target),
      });
    } else {
      this.timeline.add({
        targets: target,
        x: 400,
        onStart: this.onStart.bind(this, target),
        ease: 'Power0',
        duration: 600,
        onComplete: this.action.bind(this, cardClass, rank, target),
      });
      this.player1.dealDamage(1);
    }

    target.visible = false;
    // Play animation
    this.timeline.play();
  }

  onStart(target) {
    target.visible = true;
  }

  // to indentify the type of attack
  action(type, damage, target) {
    target.visible = false;

    const totalDamage = damage + this.player1.magicStatus();
    console.log(totalDamage + ', ' + this.player1.magicStatus());

    if (type === 'Attack') {
      if (this.dojoBoss.returnBossArmour() >= totalDamage) {
        this.dojoBoss.decreaseArmour(totalDamage);
      } else {
        const take = totalDamage - this.dojoBoss.returnBossArmour();
        this.dojoBoss.decreaseArmour(totalDamage);
        this.dojoBoss.decreaseHealth(take);
      }
      this.player1.clearMagic();
      this.player1HealthSystem.setMagic(this.player1.magicStatus());
    } else if (type === 'Magic') {
      this.player1.changeMagicStatus(damage);
      // is this a c or s lmao
    } else if (type === 'Defence') {
      this.player1.addDefence(totalDamage);
      this.player1.clearMagic();
    }
  }

  setPlayerNBossHealthSystem(player, boss) {
    boss.setArmour(this.dojoBoss.returnBossArmour());
    boss.setHealth(this.dojoBoss.returnBossHealth());

    player.setHealth(this.player1.getHealth());
    player.setArmour(this.player1.getDefenceValue());
    player.setArmour(this.player1.magicStatus());
  }
}
