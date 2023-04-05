import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import Field from "../Sprites/Field"
import Label from "../Sprites/Label"
import MixButton from "../Sprites/MixButton"
import Sprite from "../Engine/Sprite"
import {EVENTS, GAME_SETTINGS} from "../config"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}

    this.moves = GAME_SETTINGS.moves
    this.shuffles = GAME_SETTINGS.shuffles
    this.points = 0

    this.isEnable = true
  }

  create() {
    new Sprite({scene: this, key: 'bg', origin: {x: 0, y: 0}})

    this.field = new Field({scene: this, x: 150, y: 150})

    this.labelPoints = new Label({scene: this, name: 'Очки', endCount: GAME_SETTINGS.points})
    this.labelMoves = new Label({scene: this, name: 'Ходы', beginCount: this.moves, endCount: this.moves})
    this.buttonMix = new MixButton({scene: this, beginCount: this.shuffles, endCount: this.shuffles})

    this.events.on(EVENTS.blockTap, (block) => {
      if (!this.isEnable) return

      this.field.deleteCloseBlocks(block)
    })

    this.events.on(EVENTS.moveDone, () => {
      if (!this.isEnable) return

      this.labelMoves.setText(--this.moves)
      this.moves === 0 && this.disable()
      this.moves === 0 && this.buttonMix.disableInteractive()

      this.moves === 0 && this.time.delayedCall(1000, this.endGame, [], this)
    })

    this.events.on(EVENTS.deleteBlocks, (count) => {
      this.points += count
      this.labelPoints.setText(this.points)

      this.points >= GAME_SETTINGS.points && this.winGame()
    })

    this.events.on(EVENTS.pressShuffle, () => {
      if (!this.isEnable || !this.field.isEnable) return

      this.field.shuffle()
      this.buttonMix.setText(--this.shuffles)
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
  }

  update(time, delta) {
  }

  endGame() {
    this.points >= GAME_SETTINGS.points && this.winGame()
    this.points < GAME_SETTINGS.points && this.failGame()
  }

  winGame() {
    this.disable()
    this.scene.launch('Win')
  }

  failGame() {
    this.disable()
    this.scene.launch('Fail')
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    const resizeData = resize(this)

    const {isLandscape, scaleFactor, worldView} = resizeData

    if (isLandscape) {
      this.labelPoints.setPosition(50 + 180 * scaleFactor, worldView.y + 200)
      this.labelMoves.setPosition(50 + 180 * scaleFactor, worldView.y + 300)
      this.buttonMix.setPosition(50 + 180 * scaleFactor, worldView.y + 400)
    } else {
      const y0 = 50
      const dy = 120
      this.labelPoints.setPosition(worldView.x + 170, 60 + y0 * scaleFactor)
      this.labelMoves.setPosition(worldView.x + 170, 60 + (y0 + dy) * scaleFactor)
      this.buttonMix.setPosition(worldView.x + 170, 60 + (y0 + 2 * dy) * scaleFactor)
    }

    this.field.resizeField(resizeData)
  }
}
