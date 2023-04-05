export default class Sprite extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = Object.assign(this.getDefaultConfig(config), config)

    this.alpha = this.config.alpha
    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setOrigin(this.config.origin.x, this.config.origin.y)

    this.changeInteractive(this.config.interactive)
    this.onPointerDown(this.config.OnPointerdown)
  }

  onPointerDown(func) {
    this.on('pointerdown', () => func && func())
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
    // this.tint = 0x808080
  }

  getDefaultConfig(config) {
    return {
      alpha: 1,
      origin: {x: 0.5, y: 0.5},
      scale: {x: 1, y: 1},
      visible: true,
      interactive: false,
      tint: 0xffffff,
    }
  }


}


