import Phaser from 'phaser'
import {resize} from '../Engine/resizer'
import Sprite from '../Engine/Sprite'
import TapMessage from '../UI/TapMessage'
import Instruction from '../UI/Instruction'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start')
  }

  create() {
    new Sprite({scene: this, key: 'bg', origin: {x: 0, y: 0}})
    new Sprite({scene: this, key: ['ui', 'panel'], x: 700, y: 700, scale: {x: 0.95, y: 0.9}})

    this.input.on('pointerdown', () => this.scene.start('Game'), this)

    new Instruction({scene: this})

    new TapMessage({scene: this})

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    resize(this)
  }

}


