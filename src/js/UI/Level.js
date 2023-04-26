import BitmapText from '../Engine/BitmapText'
import Sprite from '../Engine/Sprite'
import Container from '../Engine/Container'

export default class Level extends Container {
  constructor(config) {
    super(config)

    this.create()
  }

  create() {
    const label = new Sprite({
      scene: this.game,
      x: 0, y: 0,
      key: ['ui', 'level'],
    })

    this.counter = new BitmapText({
      scene: this.game,
      x: 0, y: -5,
      text: 0,
      fontSize: 40
    })

    this.add([label, this.counter])
  }

  setText(level) {
    this.counter.text = level
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {}, config)
  }

}
