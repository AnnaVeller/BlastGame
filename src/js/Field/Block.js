import {EVENTS, GAME_SETTINGS} from "../config"
import BlockSimple from "./BlockSimple"
import BlockBomb from "./BlockBomb"
import Container from "../Engine/Container"
import BlockRocket from "./BlockRocket"

export const STATE = {
  simple: 'simple',
  rocket: 'rocket',
  rocketVertical: 'rocketVertical',
  bomb: 'bomb'
}

export default class Block extends Container {
  constructor(config) {
    super(config)

    this.i = this.config.i
    this.j = this.config.j

    this.isEnable = true // на клетку можно тапнуть

    this.states = {
      BlockSimple: BlockSimple,
      BlockBomb: BlockBomb,
      BlockRocket: BlockRocket
    }

    this.state = new this.states.BlockSimple({
      scene: this.game,
      key: this.config.key,
      onPointerDown: () => this.onTap(),
    })
    this.add(this.state)
  }

  getColor() {
    return this.state.color
  }

  getType() {
    return this.state.name
  }

  changeToSuperBlock() {
    this.state.destroy()
    this.state = new this.states.BlockBomb({scene: this.game, onPointerDown: () => this.onTap()})
    this.add(this.state)
  }

  changeToRocketBlock() {
    this.state.destroy()
    this.state = new this.states.BlockRocket({scene: this.game, onPointerDown: () => this.onTap()})
    this.add(this.state)
  }

  onTap() {
    if (!this.isEnable) return

    this.game.events.emit(EVENTS.blockTap, this)
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
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


  rotate(angle, duration = 100, delay = 0) {
    this.game.tweens.add({
      targets: this,
      angle,
      duration,
      delay,
      ease: Phaser.Math.Easing.Sine.InOut
    })
  }

  wrongAnimation(time = 300) {
    this.rotate(-5, time / 4, 0)
    this.rotate(5, time / 2, time / 4)
    this.rotate(0, time / 4, time * 3 / 4)
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


}


