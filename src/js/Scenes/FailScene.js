import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import Sprite from "../Engine/Sprite"
import BitmapText from "../Engine/BitmapText"

export default class FailScene extends Phaser.Scene {
  constructor() {
    super('Fail')
  }

  create() {
    new Sprite({scene: this, key: 'panel', x: 700, y: 700, scale: {x: 0.6, y: 0.6}})
    new BitmapText({scene: this, x: 700, y: 700, text: 'You FAIL!', fontSize: 100, tint: 0xff5c5c})

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    resize(this)
  }

}


