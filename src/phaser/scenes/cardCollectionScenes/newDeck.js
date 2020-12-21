import Phaser from 'phaser'
import NavigationButton from '../../components/naviButton'

export default class newDeck extends Phaser.Scene {
  constructor() {
    super('newDeck')
    this.navibutton = new NavigationButton(this)
  }

  create() {
    const { width, height } = this.scale

    this.add.text(width * 0.5, 50, 'New Deck', { fontSize: 62 }).setOrigin(0.5)

    this.navibutton.createBtn(48, 14, 24, 'Return', 'cardCollection')

    const submit = this.navibutton.createBtn(
      width * 0.5,
      height * 0.75,
      24,
      'Submit',
      'cardCollection'
    )
  }
}
