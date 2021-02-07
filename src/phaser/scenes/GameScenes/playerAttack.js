import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';

export default class playerAttack extends Phaser.Scene {
  init(data) {
    console.log(data);
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
    this.gamingScene = new GamingScene(this, 'playerAttack');
  }

  create() {
    const { width, height } = this.scale;
    this.gamingScene.buildScene(this.player1, this.dojoBoss, false);
    this.processCard(width, height);
  }

  update() {
    // Update player health
    this.gamingScene.update(this.player1.getHealth(), this.dojoBoss.returnBossHealth());

    // Set health to be 0 when its equal or less than 0

    if (this.player1.getHealth() <= 0) {
      this.gamingScene.update(0, this.dojoBoss.returnBossHealth());
    }

    if (this.dojoBoss.returnBossHealth() <= 0) {
      this.gamingScene.update(this.player1.getHealth(), 0);
    }

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
        this.background.update(this.player1.getHealth(), this.dojoBoss.returnBossHealth());
        this.scene.remove('gameSetting');
        this.scene.remove('playerAttack');
        console.log('Resyne');
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
    if (type === 'Attack' || type === 'Magic') {
      this.dojoBoss.decreaseHealth(damage);
    }
  }
}
