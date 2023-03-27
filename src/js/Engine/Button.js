import Sprite from "./Sprite"

export default class Button extends Sprite {
  constructor(game, config) {
    super(game, config)

    this.changeInteractive(this.config.interactive)

    this.onPointerDown(this.config.OnPointerdown)
  }

  onPointerDown(func) {
    this.content.on('pointerdown', () => {
      func && func()
    })
  }

  changeInteractive(mode) {
    if (mode) {
      this.enableInteractive()
    } else {
      this.disableInteractive()
    }
  }

  enableInteractive() {
    this.content.setInteractive()
    this.content.clearTint()
  }

  disableInteractive() {
    this.content.removeInteractive()
    this.content.tint = 0x808080
  }

  getObject(config) {
    return Object.assign({
      alpha: 1,
      x: 0, y: 0,
      scale: {x: 1, y: 1},
      origin: {x: 0.5, y: 0.5},
      interactive: false,
      name: '',
      onPointerDown: '',
      visible: true
    }, config)
  }
}
