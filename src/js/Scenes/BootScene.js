import Phaser from "phaser"
import {SCENE_CONFIG} from "../config"

// Сцена загрузки изображений
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    SCENE_CONFIG.sprites.forEach((el) => {
      this.load.image(el.key, el.url)
    })
  }

  create() {
    this.scene.start('Start')
  }

}


