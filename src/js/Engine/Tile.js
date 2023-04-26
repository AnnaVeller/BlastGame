import Container from './Container'
import Sprite from './Sprite'

export default class Tile extends Container {
  constructor(config) {
    super(config)

    for (let i = 0; i < this.config.count; i++) {
      const tile = new Sprite({
        scene: this.game,
        key: this.config.imageTile,
        x: this.config.dx * i, y: this.config.dy * i,
        origin: this.config.originTile,
        scale: this.config.scaleTile,
      })
      this.add(tile)
    }
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      count: 5,
      dx: 0,
      dy: 0,
      imageTile: '',
      scaleTile: {x: 1, y: 1},
      originTile: {x: 1, y: 1},
    }, config)
  }

}
