import {EVENTS, GAME_SETTINGS} from "../config"
import Sprite from "../Engine/Sprite"

export default class Block extends Sprite {
  constructor(config) {
    super(config)

    this.color = this.config.key
    this.i = this.config.i
    this.j = this.config.j

    this.setInteractive()
    this.on('pointerdown', this.onTap, this)

    this.isEnable = true // на клетку можно тапнуть
  }

  onTap() {
    if (!this.isEnable) return

    this.pressBtnAnimation()
    this.game.events.emit(EVENTS.blockTap, this)
  }

  getColor() {
    return this.color
  }

  deleteAnimation() {
    this.disable()

    this.game.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      duration: 200,
    })
  }

  moveTo(x, y, time) {
    this.disable()

    this.game.tweens.add({
      targets: this,
      x, y,
      duration: time,
      onComplete: () => this.enable()
    })
  }

  spawnAnimation() {
    this.disable()

    this.visible = true
    this.setScale(0)

    this.game.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Sine.easeOut',
      duration: 300,
      onComplete: () => this.enable()
    })
  }

  pressBtnAnimation() {
    this.game.tweens.add({
      targets: this,
      scaleX: {from: 1, to: 0.9},
      scaleY: {from: 1, to: 0.9},
      duration: 100,
      yoyo: true
    })
  }

  // падение блока на yCount блоков
  blockFall(yCount, oneTime = 150, delay = 0) {
    this.disable()

    this.game.tweens.add({
      targets: this,
      y: (this.i + yCount) * GAME_SETTINGS.size,
      delay,
      duration: yCount * oneTime,
      ease: 'Sine.easeIn',
      onComplete: () => this.enable()
    })
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
  }


}


