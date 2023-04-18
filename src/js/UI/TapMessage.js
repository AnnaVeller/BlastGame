import BitmapText from '../Engine/BitmapText'

const TIME = {
  bounce: 300,
}

export default class TapMessage extends BitmapText {
  constructor(config) {
    super(config)

    this.startBounce()
  }

  startBounce() {
    this.game.tweens.add({
      targets: this,
      alpha: 1,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: TIME.bounce,
      yoyo: true,
      repeat: -1
    })
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 700, y: 890,
      text: 'Нажмите, чтобы приступить',
      alpha: 0.8,
      fontSize: 30,
      tint: 0x92de1c,
    }, config)
  }

}
