import Phaser from 'phaser';
import SettingMenu from '../../components/gameSetting/settingMenu';
import PlayerData from '../../player/playerData';

export default class roundResult extends Phaser.Scene {
  init(data) {
    this.player1Health = data.player1Health;
    this.player2Health = data.player2Health;
    this.correctCards = data.correctCards;
    this.lengthPlayer = data.lengthPlayer;
    this.dojoBoss = data.dojoBoss;
  }

  constructor() {
    super('roundResult');
    this.playerData = new PlayerData();
  }

  create() {
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
    this.player1 = this.add
      .text(width * 0.1, height * 0.1, this.player1Health.getHealth(), { fontSize: 30 })
      .setOrigin(0.5);
    this.player2 = this.add
      .text(width * 0.9, height * 0.1, this.player2Health, { fontSize: 30 })
      .setOrigin(0.5);

    console.log('cheese');
    this.punishment(this.correctCards, this.lengthPlayer, this.player1Health);
    this.processCard(width * 0.3 + 50, height * 0.4, this.correctCards);

    // this.player1Health.dealDamage(40);
  }

  update() {
    // Update the player health
    this.player1.setText(this.player1Health.getHealth());
    this.player2Health = this.dojoBoss.returnBossHealth();
    console.log('chicken');
    this.player2.setText(this.dojoBoss.returnBossHealth());

    if (!this.timeline.isPlaying()) {
      this.bossAttack();
      console.log('NOT PLAYING');
    }
    // Set health to be 0 when its equal or less than 0

    if (this.player1Health.getHealth() <= 0) {
      this.player1.setText('0');
    }

    if (this.player2Health <= 0) {
      this.player2.setText('0');
    }

    // If the animation finished
    if (!this.timeline.isPlaying()) {
      // If the the player health is equal 0 or no more cards, switch to gameResult
      // Else restart a new round
      if (
        this.player1Health.getHealth() <= 0 ||
        this.player2Health <= 0 ||
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
          player2Health: this.dojoBoss.returnBossHealth(),
          selectedCards: this.getCards(),
          dojoBoss: this.dojoBoss,
        });
        this.scene.remove('gameSetting');
      }
    }
  }

  // Creates the pop-up screen
  popUpScreen(button, popUpName, popUpInput, data) {
    button.on(
      'pointerdown',
      function () {
        this.scene.add(popUpName, popUpInput, true, {
          object: this,
          key: 'roundResult',
        });
      },
      this
    );
  }

  // Add animation and effects for correctCards
  processCard(width, height, cards) {
    this.timeline = this.tweens.createTimeline();

    for (const i of cards) {
      const card = i.getCard();
      const cardClass = card.class;
      const rank = card.rank;
      const image = card.image;
      const target = this.add.image(width, height, image).setOrigin(0.5).setScale(0.15);

      this.timeline.add({
        targets: target,
        x: 475,
        onStart: this.onStart.bind(this, target),
        ease: 'Power1',
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
    console.log('ACTION!');
    if (type === 'Attack' || type === 'Magic') {
      this.dojoBoss.decreaseHealth(damage);
    }
  }

  punishment(cards, length, player) {
    console.log('punished');
    const nonanswerDamage = length - cards.length;
    player.dealDamage(nonanswerDamage);
  }

  // Get new cards for a new round
  getCards() {
    const newCards = this.playerData.getRandomCards(5);
    console.log(newCards);
    return newCards;
  }

  // Bosses attack
  bossAttack() {
    this.player1Health.dealDamage(this.dojoBoss.attack());
  }
}
