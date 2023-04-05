import Sprite from "../Engine/Sprite"
import BitmapText from "../Engine/BitmapText"

export default class Label extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = this.getDefaultConfig(config)

    const label = new Sprite({
      scene: this.game,
      x: 0, y: 0,
      key: 'label',
      scale: {x: 0.6, y: 0.6}
    })

    const name = new BitmapText({
      scene: this.game,
      x: 0, y: -28,
      alpha: 0.8,
      origin: {x: 0.5, y: 0.5},
      text: this.config.name,
      fontSize: 30,
    })

    this.counter = new BitmapText({
      scene: this.game,
      x: 0, y: 12,
      origin: {x: 0.5, y: 0.5},
      text: `${this.config.beginCount}/${this.config.endCount}`,
      fontSize: 40
    })

    this.add([label, name, this.counter])
  }

  setText(num) {
    this.counter.text = `${num}/${this.config.endCount}`
  }

  getDefaultConfig(config) {
    return Object.assign({
      x: 0, y: 0,
      name: 'Очки',
      beginCount: 0,
      endCount: 10,
    }, config)
  }

}


