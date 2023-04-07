import {EVENTS, GAME_SETTINGS} from "../config"
import Sprite from "../Engine/Sprite"
import Bomb from "./Bomb"
import Container from "../Engine/Container"

const STATE = {
  simple: 'simple',
  super: 'super'
}

// TODO сделать на стейтах
export default class Block extends Container {
  constructor(config) {
    super(config)

    this.color = this.config.key
    this.i = this.config.i
    this.j = this.config.j

    this.isEnable = true // на клетку можно тапнуть

    this.createBlockSimple()
  }

  createBlockSimple() {
    this.state = STATE.simple
    this.color = this.config.key

    this.block = new Sprite({
      scene: this.game,
      key: this.config.key,
      interactive: true,
      OnPointerdown: () => this.onTap()
    })

    this.add([this.block])
  }

  createBlockSuper() {
    this.state = STATE.super
    this.color = ''

    this.block = new Sprite({
      scene: this.game, key: 'superBlock',
      interactive: true,
      OnPointerdown: () => this.onTap()
    })

    const bomb = new Bomb({scene: this.game})

    this.add([this.block, bomb])
  }

  isSimple() {
    return this.state === STATE.simple
  }

  changeToSuperBlock() {
    this.block.destroy()
    this.createBlockSuper()
  }

  onTap() {
    if (!this.isEnable) return

    this.pressBtnAnimation()
    this.game.events.emit(EVENTS.blockTap, this)
  }

  deleteAnimation(duration = 100) {
    this.disable()

    this.game.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      duration,
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

  spawnAnimation(duration = 100) {
    this.disable()

    this.visible = true
    this.setScale(0)

    this.game.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Sine.easeOut',
      duration,
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
  blockFall(yCount, oneTime = 100, delay = 0) {
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


