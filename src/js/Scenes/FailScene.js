import Phaser from 'phaser'
import {resize} from '../Engine/resizer'
import Sprite from '../Engine/Sprite'
import Button from '../UI/Button'
import FinishText from '../UI/FinishText'
import {SOUNDS} from '../config'
import Fade from '../UI/Fade'

export default class FailScene extends Phaser.Scene {
  constructor() {
    super('Fail')
  }

  create() {
    new Fade({scene: this})
    new Sprite({scene: this, key: ['ui', 'panel'], x: 700, y: 700, scale: {x: 0.9, y: 0.9}})

    this.audioSystem = this.scene.get('UI').getAudioSystem()

    const text = new FinishText({scene: this, isFail: true})
    const btn = new Button({scene: this, text: 'restart', onTap: this.onTap.bind(this)})

    text.show()
    btn.show()

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  onTap() {
    this.scene.stop('Fail')
    this.scene.get('Game').resetScene()
    this.audioSystem.play(SOUNDS.start)
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    resize(this)
  }

}


