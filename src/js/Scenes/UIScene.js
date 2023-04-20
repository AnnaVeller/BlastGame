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

    const {cornerLT, cornerRB, isLandscape} = resize(this)
    if (isLandscape) {
      this.soundContainer.setPosition(cornerLT.x + 150, cornerRB.y - 70)
    } else {
      this.soundContainer.setPosition(cornerLT.x + 50, cornerRB.y - 230)
    }
  }

}


