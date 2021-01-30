import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
import SettingMenu from '../../components/gameSetting/settingMenu';
import PlayerData from '../../player/playerData';

export default class roundResult extends Phaser.Scene {
  init(data) {
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
    this.correctCards = data.correctCards;
    this.length = data.length;
  }

  constructor() {
    super('roundResult');
    this.playerData = new PlayerData();
    this.gamingScene = new GamingScene(this, 'roundResult');
  }

  create() {
    const { width, height } = this.scale;

    this.gamingScene.buildScene(this.player1Health, this.player2Health, false);

    this.punishment();
    this.processCard(width, height);

    // this.player1Health.setHealth(40);
  }

  update() {
    // Update the player health
    this.gamingScene.update(this.player1Health.getHealth(), this.player2Health.getHealth());

    // Set health to be 0 when its equal or less than 0

    if (this.player1Health.getHealth() <= 0) {
      this.player1.setText('0');
    }

    if (this.player2Health.getHealth() <= 0) {
      this.player2.setText('0');
    }

    // If the animation finished
    if (!this.timeline.isPlaying()) {
      // If the the player health is equal 0 or no more cards, switch to gameResult
      // Else restart a new round
      if (
        this.player1Health.getHealth() <= 0 ||
        this.player2Health.getHealth() <= 0 ||
        this.playerData.getCardRemainNumber() === 0
      ) {
        this.scene.start('gameResult', {
          player1Health: this.player1Health,
          player2Health: this.player2Health,
        });
        this.scene.remove('gameSetting');
      } else {
        this.scene.start('game', {
          player1Health: this.player1Health,
          player2Health: this.player2Health,
          selectedCards: this.getCards(),
        });
        this.scene.remove('gameSetting');
      }
    }
  }

  // Add animation and effects for correctCards
  processCard(width, height) {
    this.timeline = this.tweens.createTimeline();

    for (const i of this.correctCards) {
      const card = i.getCard();
      const cardClass = card.class;
      const rank = card.rank;
      const image = card.image;

      const target = this.add
        .image(width * 0.2 + 50, height * 0.4, image)
        .setOrigin(0.5)
        .setScale(0.15);

      this.timeline.add({
        targets: target,
        x: 1400,
        onStart: this.onStart.bind(this, target),
        ease: 'Power0',
        duration: 2000,
        onComplete: this.action.bind(this, cardClass, rank, target),
      });
      target.visible = false;
    }
    this.timeline.play();
  }

  // Make the object invisble
  onStart(target) {
    target.visible = true;
  }

  // Carry out the damage of a card to the player
  action(type, damage, target) {
    target.visible = false;
    if (type === 'Attack' || type === 'Magic') {
      this.player2Health.setHealth(damage);
    }
  }

  punishment() {
    const nonanswerDamage = this.length - this.correctCards.length;
    this.player1Health.setHealth(nonanswerDamage);
  }

  // Get new cards for a new round
  getCards() {
    const newCards = this.playerData.getRandomCards(5);
    console.log(newCards);
    return newCards;
  }
}
