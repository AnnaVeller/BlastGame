export default class BitmapText extends Phaser.GameObjects.BitmapText {

  constructor(config) {
    super(config.scene, config.x || 0, config.y || 0, config.font || 'marvin', config.text || '1', config.fontSize || 70)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = Object.assign(this.getDefaultConfig(config), config)

    this.alpha = this.config.alpha
    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setOrigin(this.config.origin.x, this.config.origin.y)
  }

  getDefaultConfig(config) {
    return {
      alpha: 1,
      x: 0, y: 0,
      scale: {x: 1, y: 1},
      text: 'default text',
      origin: {x: 0.5, y: 0.5},
      fontSize: 50,
      font: 'marvin',
      tint: 0xFFFFFF,
    }
  }
}


