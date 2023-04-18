import Sprite from '../Engine/Sprite'

export default class Rocket extends Sprite {
  constructor(config) {
    config.key = ['blocks', 'rocket']
    super(config)

    this.angle = this.config.isVertical ? -91 : -5

    this.game.tweens.add({
      targets: this,
      angle: this.angle + 5,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 0, y: 15,
      origin: {x: 0.5, y: 0.45},
      isVertical: false,
    }, config)
  }

}
