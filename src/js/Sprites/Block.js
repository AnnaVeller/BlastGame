import Sprite from "../Engine/Sprite"
import {EVENTS} from "../config"

export default class Block extends Sprite {
  constructor(game, config = {}) {
    super(game, config)

    this.color = this.config.key
    this.i = this.config.i
    this.j = this.config.j

    this.content.setInteractive()
    this.content.on('pointerdown', this.onTap, this)
  }

  onTap() {
    this.pressBtnAnimation()
    this.game.events.emit(EVENTS.blockTap, this)
  }

  getColor() {
    return this.color
  }

  deleteAnimation(){
    this.game.tweens.add({
      targets: this.content,
      scaleX: 0,
      scaleY: 0,
      duration: 200,
    })
  }

  pressBtnAnimation() {
    this.game.tweens.add({
      targets: this.content,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
      yoyo: true
    })
  }


}


