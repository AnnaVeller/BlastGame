import Phaser from 'phaser'
import {RESOURCES} from '../config'

// Сцена загрузки изображений
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    RESOURCES.forEach((el) => {
      el.type === 'image' && this.load.image(el.key, el.url)
      el.type === 'font' && this.load.bitmapFont(el.key, el.url, el.xml)
      el.type === 'spritesheet' && this.load.spritesheet(el.key, el.url, el.config)
      el.type === 'atlas' && this.load.atlas(el.key, el.url, el.json)
    })
  }

  create() {
    this.scene.start('Start')
  }

}


