import BitmapText from "../Engine/BitmapText"
import Sprite from "../Engine/Sprite"

export default class Buster extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = this.getDefaultConfig(config)

    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setVisible(this.config.visible)
    this.setPosition(this.config.x, this.config.y)
    this.alpha = this.config.alpha
    this.pressEvent = this.config.action

    this.isEnable = true
    this.isPress = false

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
    this.isPress = false
    this.stroke.setVisible(false)

    this.game.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 100,
    })
  }

  showChoose() {
    this.isPress = true
    this.stroke.setVisible(true)

    this.game.tweens.add({
      targets: this,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
    })
  }

  changeInteractive(mode) {
    if (mode) {
      this.enableInteractive()
    } else {
      this.disableInteractive()
    }
  }

  enable() {
    this.isEnable = true
  }

  disable() {
    this.isEnable = false
  }

  enableInteractive() {
    this.enable()
    this.button.setInteractive()
    this.button.clearTint()
  }

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
    return Object.assign({
      x: 0, y: 0,
      name: '',
      alpha: 1,
      scale: {x: 1, y: 1},
      visible: true,
      maxValue: 0,
      action: ''
    }, config)
  }

}
