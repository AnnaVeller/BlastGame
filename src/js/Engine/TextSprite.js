export default class TextSprite {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)
    this.content = this.game.add.bitmapText(this.config.x, this.config.y, this.config.font,
      this.config.text, this.config.fontSize)

    this.content.alpha = this.config.alpha

    this.content.tint = this.config.tint

    this.content.setOrigin(this.config.origin.x, this.config.origin.y)
  }

  showText(delay, duration) {
    this.game.tweens.add({
      targets: this.content,
      alpha: 1,
      delay,
      duration,
    })
  }

  changeText(text) {
    this.content.text = text
  }

  getObject(config) {
    return Object.assign({
      alpha: 1,
      x: 0, y: 0,
      text: 'default text',
      origin: {x: 0.5, y: 0.5},
      fontSize: 50,
      font: 'marvin',
      tint: 0xFFFFFF,
    }, config)
  }
}


