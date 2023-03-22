export default class TextSprite {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)
    this.style = this.getStyles(config)
    this.content = this.game.add.text(this.config.x, this.config.y, this.config.text, this.style)
    this.content.alpha = this.config.alpha

    this.content.setOrigin(this.config.origin.x, this.config.origin.y)
  }

  showText(delay, duration) {
    this.game.tweens.add({
      targets: this.content,
      alpha: 1,
      delay,
      duration,
      // hold: 1000,
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
      origin: {x: 0.5, y: 0.5}
    }, config)
  }

  getStyles(config) {
    return Object.assign(
      {
        font: '20px Arial',
        fill: '#000000',
        align: 'center',
      },
      config.textStyle || {}
    )
  }
}


