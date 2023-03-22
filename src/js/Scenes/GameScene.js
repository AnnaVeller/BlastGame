import Phaser from "phaser"
import {resize} from "../Engine/resizer"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}
  }

  create() {

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  update(time, delta) {
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)
  }

}
