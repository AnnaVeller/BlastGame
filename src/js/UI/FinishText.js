import BitmapText from '../Engine/BitmapText'
import Phaser from 'phaser'

const TIME = {
  showDelay: 200,
  show: 300
}

const TEXT = {
  fail: 'you fail!',
  win: 'you win!'
}

const COLOR = {
  fail: 0xff7070,
  win: 0x92ff92
}

export default class FinishText extends BitmapText {
  constructor(config) {
    super(config)

    this.isFail = this.config.isFail
    this.setText(this.isFail ? TEXT.fail : TEXT.win)
    this.setTint(this.isFail ? COLOR.fail : COLOR.win)
  }

  show() {
    this.game.tweens.add({
      targets: this,
      alpha: 1,
      duration: TIME.show,
      delay: TIME.showDelay,
      ease: Phaser.Math.Easing.Sine.InOut,
    })
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 700, y: 600,
      isFail: false,
      fontSize: 100,
      alpha: 0
    }, config)
  }

}
