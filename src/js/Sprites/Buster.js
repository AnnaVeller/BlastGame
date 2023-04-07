import BitmapText from "../Engine/BitmapText"
import Sprite from "../Engine/Sprite"
import Container from "../Engine/Container"

export default class Buster extends Container {
  constructor(config) {
    super(config)
    this.isEnable = true
    this.pressEvent = this.config.action

    this.createBusterBtn()
  }

  createBusterBtn() {
    this.button = new Sprite({
      scene: this.game,
      x: 0, y: 0,
      key: 'button',
      scale: {x: 0.6, y: 0.6},
      interactive: true,
      OnPointerdown: () => this.pressBtn()
    })

    this.stroke = new Sprite({
      scene: this.game,
      x: 0, y: 0,
      key: 'btnStroke',
      scale: {x: 0.6, y: 0.6},
      visible: false,
    })

    const name = new BitmapText({
      scene: this.game,
      x: 0, y: -28,
      alpha: 0.8,
      text: this.config.name,
      fontSize: 25
    })

    this.counter = new BitmapText({
      scene: this.game,
      x: 0, y: 12,
      text: `${this.config.maxValue}/${this.config.maxValue}`,
      fontSize: 40
    })

    this.add([this.button, name, this.counter, this.stroke])
  }

  pressBtn() {
    if (!this.isEnable) return
    this.game.events.emit(this.pressEvent)
  }

  hideChoose() {
    this.stroke.setVisible(false)

    this.game.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 100,
    })
  }

  showChoose() {
    this.stroke.setVisible(true)

    this.game.tweens.add({
      targets: this,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
    })
  }

  // changeInteractive(mode) {
  //   if (mode) {
  //     this.enableInteractive()
  //   } else {
  //     this.disableInteractive()
  //   }
  // }

  // enable() {
  //   this.isEnable = true
  // }

  disable() {
    this.isEnable = false
  }

  // enableInteractive() {
  //   this.enable()
  //   this.button.setInteractive()
  //   this.button.clearTint()
  // }

  disableInteractive() {
    this.disable()
    this.button.removeInteractive()
    this.button.tint = 0x808080
  }

  setText(num) {
    this.counter.text = `${num}/${this.config.maxValue}`
    num === 0 && this.disableInteractive()
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: '',
      maxValue: 0,
      action: ''
    }, config)
  }

}
