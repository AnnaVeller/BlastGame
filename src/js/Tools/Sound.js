import {EVENTS} from '../config'

export default class Sound {
  constructor(config) {
    this.game = config.scene

    this.game.events.on(EVENTS.soundOn, this.turnOn, this)
    this.game.events.on(EVENTS.soundOff, this.turnOff, this)
  }

  turnOn() {
    this.game.sound.setVolume(1)
  }

  turnOff() {
    this.game.sound.setVolume(0)
  }

  play(key) {
    this.game.sound.play(key)
  }

}
