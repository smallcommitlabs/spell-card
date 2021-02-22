import { timingSafeEqual } from 'crypto';
import Phaser from 'phaser';
import GamingScene from '../../components/gamingScene';
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
    console.log('roundResult');
    this.playerData = new PlayerData();
    this.gamingScene = new GamingScene(this, 'roundResult');
  }

  create() {
    this.gamingScene.buildScene(this.player1, this.dojoBoss, false);
    this.player1.changeMagicStatus(0);
    this.punishment(this.correctCards, this.lengthPlayer, this.player1);
    this.bossAttack();

    console.log(this.player1.getHealth(), ' ', this.dojoBoss.returnBossHealth(), ' round');
  }

  update() {
    this.gamingScene.updatePlayer(this.player1.getHealth(), this.player1.getDefenceValue());

    this.gamingScene.updateBoss(this.dojoBoss.returnBossHealth(), this.dojoBoss.returnBossArmour());
    // This update player and boss health system
    this.bossHealthSystem = this.gamingScene.returnBossHealthSystem();
    this.playerHealthSystem = this.gamingScene.returnPlayerHealthSystem();

    this.bossHealthSystem.setArmour(this.dojoBoss.returnBossArmour());
    this.bossHealthSystem.setHealth(this.dojoBoss.returnBossHealth());

    this.playerHealthSystem.setHealth(this.player1.getHealth());
    this.playerHealthSystem.setArmour(this.player1.getDefenceValue());
    this.playerHealthSystem.setArmour(this.player1.magicStatus());
    // Set health to be 0 when its equal or less than 0

    // THIS REQUIRES PLAYER ARMOUR VALUE
    // if (this.player1.getHealth() <= 0) {
    //   this.gamingScene.updatePlayer(0, this.player1.getDefenceValue());
    // }

    // if (this.dojoBoss.returnBossHealth() <= 0) {
    //   this.gamingScene.update(0, this.dojoBoss.returnBossArmour());
    // }

    // If the animation finished
    // if (!this.timeline.isPlaying()) {
    // If the the player health is equal 0 or no more cards, switch to gameResult
    // Else restart a new round
    if (
      this.player1.getHealth() <= 0 ||
      this.dojoBoss.returnBossHealth() <= 0 ||
      this.playerData.getCardRemainNumber() === 0
    ) {
      this.playerData.refreshDecks();
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
        dojoBoss: this.dojoBoss,
      });
      this.scene.remove('gameSetting');
    }
  }

  punishment(cards, length, player) {
    const nonanswerDamage = length - cards.length;
    player.dealDamage(nonanswerDamage);
  }

  // Get new cards for a new round
  getCards() {
    const newCards = this.playerData.getRandomCards(5);
    return newCards;
  }

  // Bosses attack
  bossAttack() {
    for (let i = 0; i < 3; i++) {
      const damage = this.dojoBoss.randomAttack();
      console.log(this.player1.getDefenceValue());
      if (this.player1.getDefenceValue() >= damage) {
        this.player1.reduceDefence(damage);
      } else {
        const takes = damage - this.player1.getDefenceValue();
        this.player1.reduceDefence(damage);
        this.player1.dealDamage(takes);
      }
    }
  }
}
