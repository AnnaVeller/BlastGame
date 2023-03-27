import Phaser from "phaser"
import {getWorldView, resize} from "../Engine/resizer"
import Field from "../Sprites/Field"
import Label from "../Sprites/Label"
import MixButton from "../Sprites/MixButton";
import {EVENTS, GAME_SETTINGS} from "../config"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}

    this.moves = GAME_SETTINGS.moves
    this.mixes = GAME_SETTINGS.countMix
    this.points = 0

    this.isEnable = true
  }

  create() {
    this.field = new Field(this, {x: 150, y: 150})

    this.labelPoints = new Label(this, {name: 'Очки', endCount: GAME_SETTINGS.points})
    this.labelMoves = new Label(this, {name: 'Ходы', beginCount: this.moves, endCount: this.moves})
    this.labelMix = new MixButton(this, {})

    this.events.on(EVENTS.blockTap, (block) => {
      if (!this.isEnable) return
      this.field.deleteCloseBlocks(block)
    })

    this.events.on(EVENTS.moveDone, () => {
      if (!this.isEnable) return

      this.labelMoves.setText(--this.moves)
      this.moves === 0 && this.disable()
    })

    this.events.on(EVENTS.deleteBlocks, (count) => {
      this.points += count
      this.labelPoints.setText(this.points)
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  update(time, delta) {
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
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
      midY,
      aspectRatio
    } = resize(this)

    // левый вверх экрана
    const worldView = getWorldView(this.cameras.main)

    if (isLandscape) {
      this.labelPoints.container.setPosition(50 + 180 * scaleFactor, worldView.y + 200)
      this.labelMoves.container.setPosition(50 + 180 * scaleFactor, worldView.y + 300)
      this.labelMix.container.setPosition(50 + 180 * scaleFactor, worldView.y + 400)
    } else {
      const y0 = 50
      const dy = 120
      this.labelPoints.container.setPosition(worldView.x + 170, 60 + y0 * scaleFactor)
      this.labelMoves.container.setPosition(worldView.x + 170, 60 + (y0 + dy) * scaleFactor)
      this.labelMix.container.setPosition(worldView.x + 170, 60 + (y0 + 2 * dy) * scaleFactor)
    }

    this.resizeField({height, width, scaleFactor, isLandscape, midX, midY, aspectRatio})
  }

  resizeField({height, width, scaleFactor, isLandscape, midX, midY, aspectRatio}) {
    if (!this.field) return

    const {cols, rows, size} = GAME_SETTINGS

    const fieldWidth = rows * size
    const fieldHeight = cols * size

    let scale, x, y

    if (isLandscape) {
      scale = height / fieldHeight * 0.9 / scaleFactor

      // вытянутое по горизонали поле
      if (fieldWidth > fieldHeight && width < fieldWidth * scale) {
        scale = width / fieldWidth * 0.9
      }

      x = midX * 2 - (fieldWidth - size / 2 + 50) * scale - (aspectRatio - 1) * 200
      y = midY + (size / 2 - fieldHeight / 2) * scale

    } else {
      scale = width / fieldWidth * 0.9 / scaleFactor

      // вытянутое по горизонали поле
      if (fieldHeight > fieldWidth && height < fieldHeight * scale) {
        scale = height / fieldHeight * 0.9 / scaleFactor
      }

      x = midX - (fieldWidth / 2 - size / 2) * scale
      y = midY * 2 + (size / 2 - fieldHeight - 50) * scale - (1 - aspectRatio) * 300
    }

    this.field.container.scale = scale
    this.field.container.setPosition(x, y)

  }

}
