import Sprite from '../Engine/Sprite'
import Bomb from './Bomb'
import Container from '../Engine/Container'
import {STATE} from './Block'

export default class BlockBomb extends Container {
  constructor(config) {
    super(config)

    this.color = ''

    this.name = STATE.bomb
    this.block = new Sprite({
      scene: this.game,
      key: ['blocks', 'super_block'],
      interactive: true,
      OnPointerdown: () => this.config.onPointerDown()
    })

    const bomb = new Bomb({scene: this.game})

    this.add([this.block, bomb])
  }
}


