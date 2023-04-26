export default class Container extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, 0, 0)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = Object.assign(this.getDefaultConfig(config), config)

    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setVisible(this.config.visible)
    this.setPosition(this.config.x, this.config.y)
    this.alpha = this.config.alpha
    this.setAngle(this.config.angle)
  }

  getDefaultConfig(config) {
    return Object.assign({
      x: 0, y: 0,
      alpha: 1,
      scale: {x: 1, y: 1},
      visible: true,
      angle: 0
    }, config)
  }

}
