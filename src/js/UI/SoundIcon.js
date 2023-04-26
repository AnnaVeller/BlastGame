import Sprite from '../Engine/Sprite'
import Container from '../Engine/Container'
import {EVENTS} from '../config'

export default class SoundIcon extends Container {
  constructor(config) {
    super(config)

    this.soundOn = new Sprite({scene: this.game, key: ['ui', 'soundOn'], alpha: 0.8})
    this.soundOff = new Sprite({scene: this.game, key: ['ui', 'soundOff'], alpha: 0.8, visible: false})
    this.add([this.soundOn, this.soundOff])

    this.soundOn.setInteractive()
    this.soundOff.setInteractive()
    this.soundOn.on('pointerdown', () => this.turnOffSound())
    this.soundOff.on('pointerdown', () => this.turnOnSound())
  }

  play(key) {
    this.game.sound.add(key).play()
  }

  turnOnSound() {
    this.game.events.emit(EVENTS.soundOn)
    this.soundOff.visible = false
    this.soundOn.visible = true
  }

  turnOffSound() {
    this.game.events.emit(EVENTS.soundOff)
    this.soundOff.visible = true
    this.soundOn.visible = false
  }

}
