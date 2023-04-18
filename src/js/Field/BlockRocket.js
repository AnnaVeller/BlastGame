import Sprite from '../Engine/Sprite'
import Container from '../Engine/Container'
import Rocket from './Rocket'
import {STATE} from './Block'

export default class BlockRocket extends Container {
  constructor(config) {
    super(config)

    this.color = ''

    this.name = Math.random() > 0.5 ? STATE.rocket : STATE.rocketVertical

    this.block = new Sprite({
      scene: this.game,
      key: 'superBlock',
      interactive: true,
      OnPointerdown: () => this.config.onPointerDown()
    })

    const rocket = new Rocket({
      scene: this.game,
      isVertical: this.name === STATE.rocketVertical
    })

    this.add([this.block, rocket])
  }
}


