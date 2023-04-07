export default class Container extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = this.getDefaultConfig(config)

    this.setScale(this.config.scale.x, this.config.scale.y)
    this.setVisible(this.config.visible)
    this.setPosition(this.config.x, this.config.y)
    this.alpha = this.config.alpha
  }

  getDefaultConfig(config) {
    return Object.assign({
      x: 0, y: 0,
      alpha: 1,
      scale: {x: 1, y: 1},
      visible: true,
    }, config)
  }

}
