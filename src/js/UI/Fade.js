import Sprite from '../Engine/Sprite'

export default class Fade extends Sprite {
  constructor(config) {
    config.key = ['ui', 'fieldTile']
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 700, y: 700,
      scale: {x: 9, y: 9},
      alpha: 0.4,
    }, config)
  }

}
