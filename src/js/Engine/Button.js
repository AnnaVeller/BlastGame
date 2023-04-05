import Sprite from "./Sprite"

export default class Button extends Sprite {
  constructor(config) {
    super(config)

    this.changeInteractive(this.config.interactive)

    this.onPointerDown(this.config.OnPointerdown)
  }

  onPointerDown(func) {
    this.on('pointerdown', () => {
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
    this.setInteractive()
    this.clearTint()
  }

  disableInteractive() {
    this.removeInteractive()
    this.tint = 0x808080
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {})
  }
}
