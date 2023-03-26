import Sprite from "../Engine/Sprite"
import {EVENTS, GAME_SETTINGS} from "../config"

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

  deleteAnimation() {
    this.game.tweens.add({
      targets: this.content,
      scaleX: 0,
      scaleY: 0,
      duration: 200,
      onComplete: () => {
        this.i = null
        this.j = null
      }
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

  // падение блока на yCount блоков
  blockFall(yCount, oneTime = 150, delay = 0) {
    console.log('start blockFall')

    const newY = (this.i + yCount) * GAME_SETTINGS.size

    this.game.tweens.add({
      targets: this.content,
      y: newY,
      delay,
      duration: yCount * oneTime,
      onComplete: () => {
        console.log('-----')
        console.log(this.i, this.j)
        this.i += yCount
        console.log(this.i, this.j)
      }
    })
  }


}


