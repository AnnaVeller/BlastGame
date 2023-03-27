import TextSprite from "../Engine/TextSprite"
import Sprite from "../Engine/Sprite"

export default class Label {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)

    const label = new Sprite(this.game, {
      x: 0, y: 0,
      key: 'label',
      scale: {x: 0.6, y: 0.6}
    })

    const name = new TextSprite(this.game, {
      x: 0, y: -28,
      alpha: 0.8,
      origin: {x: 0.5, y: 0.5},
      text: this.config.name,
      textStyle: {font: '30px Monospace', fill: '#000000'},
    })

    this.counter = new TextSprite(this.game, {
      x: 0, y: 12,
      origin: {x: 0.5, y: 0.5},
      text: `${this.config.beginCount}/${this.config.endCount}`,
      textStyle: {font: '50px Monospace', fill: '#000000'},
    })

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.container.add([label.content, name.content, this.counter.content])
  }

  setText(num) {
    this.counter.content.text = `${num}/${this.config.endCount}`
  }

  getObject(config) {
    return Object.assign({
      x: 0, y: 0,
      name: 'Очки',
      beginCount: 0,
      endCount: 10,
    }, config)
  }


}


