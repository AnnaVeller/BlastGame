import Sprite from "../Engine/Sprite"

export default class BlockStroke extends Sprite {
  constructor(config) {
    config.key = 'stroke'
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 0, y: 0,
      origin: {x: 0.5, y: 0.45}
    }, config)
  }

}


