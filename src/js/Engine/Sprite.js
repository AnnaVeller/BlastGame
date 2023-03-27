export default class Sprite {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)

    this.content = game.add.sprite(this.config.x, this.config.y, this.config.key)
    this.content.alpha = this.config.alpha
    this.content.setOrigin(this.config.origin.x, this.config.origin.y)
    this.content.setScale(this.config.scale.x, this.config.scale.y)
    this.content.visible = this.config.visible
    this.name = this.config.name

    this.content.parentClass = this

    if (this.config.tint) {
      this.content.tint = this.config.tint
    }
    if (this.config.interactive) {
      this.content.setInteractive()
    }
  }

  // изменяет скейл сохраняя знаки
  changeScale(valueX, valueY = valueX) {
    this.content.setScale(Math.sign(this.content.scaleX) * valueX, Math.sign(this.content.scaleY) * valueY)
  }

  getObject(config) {
    return Object.assign({
      alpha: 1,
      x: 0, y: 0,
      scale: {x: 1, y: 1},
      origin: {x: 0.5, y: 0.5},
      interactive: false,
      name: '',
      visible: true
    }, config)
  }
}


