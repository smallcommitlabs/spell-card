import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
import SettingMenu from '../../components/gameSetting/settingMenu';
import PlayerData from '../../player/playerData';

export default class roundResult extends Phaser.Scene {
  init(data) {
    this.player1 = data.player1;
    this.dojoBoss = data.dojoBoss;
    this.correctCards = data.correctCards;
    this.lengthPlayer = data.lengthPlayer;
  }

  constructor() {
    super('roundResult');

    this.playerData = new PlayerData();
    this.gamingScene = new GamingScene(this, 'roundResult');
  }

  create() {
    this.gamingScene.buildScene(this.player1, this.dojoBoss, false);
    this.punishment(this.correctCards, this.lengthPlayer, this.player1);
    this.bossAttack();
  }

  update() {
    // Update the player health
    // This update requires player armour
    this.gamingScene.update(
      this.player1.getHealth(),
      this.dojoBoss.returnBossHealth(),
      0,
      this.dojoBoss.returnBossArmour()
    );

    // this.dojoBoss = this.dojoBoss.returnBossHealth();

    // Set health to be 0 when its equal or less than 0

    // THIS REQUIRES PLAYER ARMOUR VALUE
    if (this.player1.getHealth() <= 0) {
      this.gamingScene.update(
        0,
        this.dojoBoss.returnBossHealth(),
        0,
        this.dojoBoss.returnBossArmour()
      );
    }
    // THIS REQUIRES PLAYER ARMOUR VALUE
    if (this.dojoBoss.returnBossHealth() <= 0) {
      this.gamingScene.update(this.player1.getHealth(), 0, 0, this.dojoBoss.returnBossArmour());
    }

    // If the animation finished
    // if (!this.timeline.isPlaying()) {
    // If the the player health is equal 0 or no more cards, switch to gameResult
    // Else restart a new round
    if (
      this.player1.getHealth() <= 0 ||
      this.dojoBoss.returnBossHealth() <= 0 ||
      this.playerData.getCardRemainNumber() === 0
    ) {
      this.scene.start('gameResult', {
        player1: this.player1,
        dojoBoss: this.dojoBoss,
      });
      this.scene.remove('gameSetting');
    } else {
      this.scene.start('game', {
        player1: this.player1,
        dojoBoss: this.dojoBoss,
        selectedCards: this.getCards(),
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
      this.player1.dealDamage(this.dojoBoss.randomAttack());
    }
  }
}
