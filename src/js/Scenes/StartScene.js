import Phaser from "phaser"
import {resize} from "../Engine/resizer"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start')
  }

  init() {
  }

  create() {
    this.scene.start('Game')

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)
  }

}


