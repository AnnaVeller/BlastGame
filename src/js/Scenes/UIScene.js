import Phaser from 'phaser'
import {resize} from '../Engine/resizer'
import Sound from '../Tools/Sound'
import SoundIcon from '../UI/SoundIcon'

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UI')
  }

  create() {
    this.audioSystem = new Sound({scene: this})
    this.soundContainer = new SoundIcon({scene: this})

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  getAudioSystem() {
    return this.audioSystem
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    const {cornerLT, cornerRB} = resize(this)
    this.soundContainer.setPosition(cornerLT.x + 100, cornerRB.y - 100)
  }

}


