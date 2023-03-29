import TextSprite from "../Engine/TextSprite"
import Button from "../Engine/Button"
import {EVENTS} from "../config"

export default class MixButton {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)

    this.button = new Button(this.game, {
      x: 0, y: 0,
      key: 'button',
      scale: {x: 0.6, y: 0.6},
      interactive: true,
      OnPointerdown: () => this.pressBtn()
    })

    const name = new TextSprite(this.game, {
      x: 0, y: -28,
      alpha: 0.8,
      text: this.config.name,
      fontSize: 25
    })

    this.counter = new TextSprite(this.game, {
      x: 0, y: 12,
      text: `${this.config.beginCount}/${this.config.endCount}`,
      fontSize: 40
    })

    this.isEnable = true

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.add([this.button.content, name.content, this.counter.content])
  }

  pressBtn() {
    if (!this.isEnable) return

    this.game.events.emit(EVENTS.pressShuffle)

    this.game.tweens.add({
      targets: this.container,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
      yoyo: true,
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
    this.button.content.setInteractive()
    this.button.content.clearTint()
  }

  disableInteractive() {
    this.disable()
    this.button.content.removeInteractive()
    this.button.content.tint = 0x808080
  }

  setText(num) {
    this.counter.content.text = `${num}/${this.config.endCount}`
  }

  getObject(config) {
    return Object.assign({
      x: 0, y: 0,
      name: 'Перемешать',
      beginCount: 4,
      endCount: 4,
      alpha: 1,
      scale: {x: 1, y: 1},
      origin: {x: 0.5, y: 0.5},
      onPointerDown: ''
    }, config)
  }

}


