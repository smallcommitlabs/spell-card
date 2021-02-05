import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
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
    this.gamingScene = new GamingScene(this, 'roundResult');
  }

  create() {
    const { width, height } = this.scale;

    this.gamingScene.buildScene(this.player1Health, this.player2Health, false);

    this.punishment();
    // this.processCard(width, height);

    this.bossShield = this.add
      .text(width * 0.85, height * 0.1, this.dojoBoss.returnBossArmour(), { fontSize: 30 })
      .setOrigin(0.5);

    // this.player1Health.dealDamage(40);
  }

  update() {
    // Update the player health

    this.gamingScene.update(this.player1Health.getHealth(), this.dojoBoss.returnBossHealth());

    this.player2Health = this.dojoBoss.returnBossHealth();

    if (!this.timeline.isPlaying()) {
      this.bossAttack();
      console.log('NOT PLAYING');
    }


    // Set health to be 0 when its equal or less than 0

    if (this.player1Health.getHealth() <= 0) {
      this.gamingScene.update(0, this.player2Health.getHealth());
    }

    if (this.dojoBoss.returnBossHealth() <= 0) {
      this.gamingScene.update(this.player1Health.getHealth(), 0);
    }

    // If the animation finished
    // if (!this.timeline.isPlaying()) {
    // If the the player health is equal 0 or no more cards, switch to gameResult
    // Else restart a new round
    if (
      this.player1Health.getHealth() <= 0 ||
      this.dojoBoss.returnBossHealth() <= 0 ||
      this.playerData.getCardRemainNumber() === 0
    ) {
      this.scene.start('gameResult', {
        player1Health: this.player1Health,
        player2Health: this.dojoBoss,
      });
      this.scene.remove('gameSetting');
    } else {
      this.scene.start('game', {
        player1Health: this.player1Health,
        player2Health: this.player2Health,
        selectedCards: this.getCards(),
        dojoBoss: this.dojoBoss,
      });
      this.scene.remove('gameSetting');
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
    for (let i = 0; i < 3; i++) {
      this.player1Health.dealDamage(this.dojoBoss.randomAttack());
    }
  }
}
