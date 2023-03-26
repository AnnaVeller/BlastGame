import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import {EVENTS, GAME_SETTINGS, FIELD_SIZE} from "../config"
import Field from "../Sprites/Field"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}
  }

  create() {
    this.field = new Field(this, {x: 150, y: 150})

    this.events.on(EVENTS.blockTap, (block) => {
      this.field.deleteCloseBlocks(block)
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  update(time, delta) {
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    const {
      height,
      width,
      scaleFactor,
      isLandscape,
      midX,
      midY
    } = resize(this)

    this.resizeField({height, width, scaleFactor, isLandscape, midX, midY})
  }

  resizeField({height, width, scaleFactor, isLandscape, midX, midY}) {
    let scale
    if (isLandscape) {
      scale = height / FIELD_SIZE.h * 0.9

      // вытянутое по горизонали поле
      if (FIELD_SIZE.w > FIELD_SIZE.h && width < FIELD_SIZE.w * scale) {
        scale = width / FIELD_SIZE.w * 0.9
      }

    } else {
      scale = width / FIELD_SIZE.w * 0.9 / scaleFactor

      // вытянутое по горизонали поле
      if (FIELD_SIZE.h > FIELD_SIZE.w && height < FIELD_SIZE.h * scale) {
        scale = height / FIELD_SIZE.h * 0.9 / scaleFactor
      }

    }

    this.field.container.scale = scale
    this.field.container.setPosition(midX - (FIELD_SIZE.w / 2 - GAME_SETTINGS.size / 2) * scale,
      midY + (GAME_SETTINGS.size / 2 - FIELD_SIZE.h / 2) * scale)
  }

}
