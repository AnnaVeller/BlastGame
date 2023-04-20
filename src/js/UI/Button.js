import BitmapText from '../Engine/BitmapText'
import Sprite from '../Engine/Sprite'
import Container from '../Engine/Container'
import Phaser from 'phaser'

const TIME = {
  startDelay: 500,
  show: 400,
  bounce: 300,
  click: 200
}

export default class Button extends Container {
  constructor(config) {
    super(config)
    this.isEnable = true

    this.createBusterBtn()
  }

  show() {
    this.game.tweens.add({
      targets: this,
      scaleX: {from: 0.5, to: 1},
      scaleY: {from: 0.5, to: 1},
      delay: TIME.startDelay,
      duration: TIME.show,
      ease: Phaser.Math.Easing.Back.Out,
    })

    this.animation = this.game.tweens.add({
      targets: this,
      scaleX: 0.95,
      scaleY: 0.9,
      duration: TIME.bounce,
      delay: TIME.startDelay + TIME.show,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    })
  }

  createBusterBtn() {
    this.button = new Sprite({
      scene: this.game,
      key: this.config.buttonImg,
      interactive: true,
      OnPointerdown: () => this.pressBtn()
    })

    this.text = new BitmapText({
      scene: this.game, y: -10,
      text: this.config.text,
      fontSize: this.config.textFont
    })

    this.add([this.button, this.text])
  }

  pressBtn() {
    if (!this.isEnable) return

    this.animation && this.animation.stop()
    this.disable()

    this.animation = this.game.tweens.add({
      targets: this,
      scaleX: 0.2, scaleY: 0.2,
      duration: TIME.click,
      ease: Phaser.Math.Easing.Sine.InOut,
      onComplete: this.config.onTap
    })
  }

  enable() {
    this.isEnable = true
  }

  disable() {
    this.isEnable = false
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      text: 'default',
      buttonImg: ['button', 'button_green'],
      textFont: 60,
      x: 700, y: 800,
      scale: {x: 0, y: 0},
      onTap: () => {}
    }, config)
  }

}
