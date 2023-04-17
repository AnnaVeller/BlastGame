import Sprite from "../Engine/Sprite"
import Container from "../Engine/Container"
import {STATE} from "./Block"

export default class BlockSimple extends Container {
  constructor(config) {
    super(config)

    this.name = STATE.simple
    this.color = this.config.key

    this.block = new Sprite({
      scene: this.game,
      key: this.config.key,
      interactive: true,
      OnPointerdown: () => this.config.onPointerDown()
    })

    this.add([this.block])
  }

}


