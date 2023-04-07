import Sprite from "../Engine/Sprite"
import {TIME} from "../config"

export default class Explosion extends Sprite {
  constructor(config) {
    config.key = 'explosionSpritesheet'
    super(config)

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(this.config.key),
      duration: TIME.explosion,
      // hideOnComplete: true
    })

    this.play({key: 'idle'})
    this.game.time.delayedCall(TIME.explosion, () => this.destroy(), [], this)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      x: 0, y: 0,
      key: 'explosionSpritesheet',
      scale: {x: 2, y: 2}
    }, config)
  }

}


