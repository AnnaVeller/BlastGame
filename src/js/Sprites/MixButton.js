import TextSprite from "../Engine/TextSprite"
import Button from "../Engine/Button"

export default class MixButton {
  constructor(game, config = {}) {
    this.game = game
    this.config = this.getObject(config)

    const label = new Button(this.game, {
      x: 0, y: 0,
      key: 'button',
      scale: {x: 0.6, y: 0.6},
      interactive: true,
      OnPointerdown: () => this.pressBtn()
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

  pressBtn() {
    this.game.tweens.add({
      targets: this.container,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
      yoyo: true
    })
  }

  setText(num) {
    this.counter.content.text = `${num}/${this.config.endCount}`
  }

  getObject(config) {
    return Object.assign({
      x: 0, y: 0,
      name: 'Перемешать',
      beginCount: 4,
      endCount: 4,
      alpha: 1,
      scale: {x: 1, y: 1},
      origin: {x: 0.5, y: 0.5},
      onPointerDown: ''
    }, config)
  }

}


