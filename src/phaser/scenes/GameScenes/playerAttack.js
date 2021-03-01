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
    this.gamingScene.buildScene(this.player1, this.dojoBoss, false);

    // Set up magic health and defence
    this.playerHealthSystem = this.gamingScene.returnPlayerHealthSystem();
    this.bossHealthSystem = this.gamingScene.returnBossHealthSystem();

    this.setPlayerNBossHealthSystem(this.playerHealthSystem, this.bossHealthSystem);

    this.processCard();

    console.log(this.player1.getHealth(), ' ', this.dojoBoss.returnBossHealth());
  }

  update() {
    // update boss health;
    this.background.updateBoss(this.dojoBoss.returnBossHealth(), this.dojoBoss.returnBossArmour());

    // Get the HealthSystem object for the player and boss
    this.player1HealthSystem = this.background.returnPlayerHealthSystem();
    this.dojoHealthSystem = this.background.returnBossHealthSystem();

    // If the animation finished
    if (!this.gamingScene.returnPlayer().anims.isPlaying) {
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
          counter: this.countdown,
          mainGameCounter: this.mainGameCounter,
        });
      }
    }
  }

  // Add animation and effects for correctCards
  processCard() {
    const card = this.currentCard.getCard();
    const cardClass = card.class;
    const rank = card.rank;
    // correct and incorrect card animations
    if (this.correctness && cardClass === 'Attack') {
      this.gamingScene.playAttack();
      this.action(cardClass, rank);
    } else if (this.correctness && cardClass === 'Defence') {
      this.gamingScene.playDefence();
      this.action(cardClass, rank);
    } else if (this.correctness && cardClass === 'Magic') {
      // replace this with magic
      this.gamingScene.playMagic();
      this.action(cardClass, rank);
    } else {
      this.gamingScene.playSelfDamage();
      this.player1.dealDamage(1);
    }
  }

  // to indentify the type of attack
  action(type, damage) {
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
    player.setMagic(this.player1.magicStatus());
  }
}
