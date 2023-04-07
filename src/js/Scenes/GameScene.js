import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import Field from "../Field/Field"
import Label from "../Sprites/Label"
import Sprite from "../Engine/Sprite"
import BombBuster from "../Sprites/BombBuster"
import TeleportBuster from "../Sprites/TeleportBuster"
import MixBuster from "../Sprites/MixBuster"
import {EVENTS, GAME_SETTINGS, TIME} from "../config"

const STATE = {
  game: 'game',
  mix: 'mix',
  bomb: 'bomb',
  teleport: 'teleport',
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.moves = GAME_SETTINGS.moves
    this.shuffles = GAME_SETTINGS.shuffles
    this.points = 0
    this.bombs = GAME_SETTINGS.bombs
    this.teleports = GAME_SETTINGS.teleports

    this.isEnable = true

    this.state = STATE.game

    this.blocksTap = []
  }

  create() {
    new Sprite({scene: this, key: 'bg', origin: {x: 0, y: 0}})

    this.field = new Field({scene: this, x: 150, y: 150})
    this.labelPoints = new Label({scene: this, name: 'Очки', endCount: GAME_SETTINGS.points})
    this.labelMoves = new Label({scene: this, name: 'Ходы', beginCount: this.moves, endCount: this.moves})
    this.buttonMix = new MixBuster({scene: this})
    this.buttonBomb = new BombBuster({scene: this})
    this.buttonTeleport = new TeleportBuster({scene: this})

    this.events.on(EVENTS.blockTap, this.onBlockTap, this) // тап на блок
    this.events.on(EVENTS.pressShuffle, this.pressShuffle, this)
    this.events.on(EVENTS.pressBomb, this.pressBomb, this)
    this.events.on(EVENTS.pressTeleport, this.pressTeleport, this)
    this.events.on(EVENTS.endAction, this.endAction, this)

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  pressTeleport() {
    this.state === STATE.teleport ? this.setGameState() : this.setTeleportState()
  }

  pressBomb() {
    this.state === STATE.bomb ? this.setGameState() : this.setBombState()
  }

  pressShuffle() {
    if (!this.isEnable || !this.field.isEnable) return

    this.setMixState()
    this.field.shuffleBlocks()
    this.buttonMix.setText(--this.shuffles)
    this.time.delayedCall(TIME.shuffle, this.setGameState, [], this)
  }

  endAction(count) {
    this.points += count
    this.labelPoints.setText(this.points)

    this.points >= GAME_SETTINGS.points && this.winGame()
    this.moves === 0 && this.endGame()
  }

  onBlockTap(block) {
    if (!this.isEnable) return

    switch (this.state) {

      case STATE.game:
        const flag1 = block.isSimple() ? this.field.deleteCloseBlocks(block) : this.field.deleteSuperBlock(block)

        if (!flag1) return

        this.labelMoves.setText(--this.moves)
        this.moves === 0 && this.disable()
        break

      case STATE.bomb:
        const flag2 = this.field.deleteRadius(block, GAME_SETTINGS.bombR)

        if (!flag2) return

        this.buttonBomb.setText(--this.bombs)
        this.setGameState()
        break

      case STATE.teleport:

        if (this.blocksTap.includes(block)) {
          // убираем блок из выбранных
          this.field.deleteStroke(block)
          this.blocksTap.splice(this.blocksTap.indexOf(block), 1)

        } else {
          this.blocksTap.push(block)
          this.field.createStroke(block)

          if (this.blocksTap.length === 2) {
            this.field.deleteStrokes()

            this.field.teleportBlocks(this.blocksTap[0], this.blocksTap[1])
            this.buttonTeleport.setText(--this.teleports)
            this.setGameState()
            this.blocksTap = []
          }
        }
        break
      default:
        break
    }
  }

  deleteTeleportSettings() {
    this.field.deleteStrokes()
    this.blocksTap = []
  }

  setMixState() {
    this.state = STATE.mix
    this.buttonMix.showChoose()
    this.buttonBomb.hideChoose()
    this.buttonTeleport.hideChoose()
    this.deleteTeleportSettings()
  }

  setTeleportState() {
    if (this.state === STATE.mix) return

    this.state = STATE.teleport
    this.buttonTeleport.showChoose()
    this.buttonBomb.hideChoose()
  }

  setBombState() {
    if (this.state === STATE.mix) return

    this.state = STATE.bomb
    this.buttonTeleport.hideChoose()
    this.buttonBomb.showChoose()
    this.deleteTeleportSettings()
  }

  setGameState() {
    this.state = STATE.game
    this.buttonMix.hideChoose()
    this.buttonTeleport.hideChoose()
    this.buttonBomb.hideChoose()
    this.deleteTeleportSettings()
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
  }

  endGame() {
    this.points >= GAME_SETTINGS.points && this.winGame()
    this.points < GAME_SETTINGS.points && this.failGame()

    this.buttonMix.disableInteractive()
    this.buttonBomb.disableInteractive()
    this.buttonTeleport.disableInteractive()
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
      this.buttonBomb.setPosition(50 + 180 * scaleFactor, worldView.y + 500)
      this.buttonTeleport.setPosition(50 + 180 * scaleFactor, worldView.y + 600)
    } else {
      this.labelPoints.setPosition(worldView.x + 150, worldView.y + 50)
      this.labelMoves.setPosition(worldView.x + 150, worldView.y + 150)
      this.buttonMix.setPosition(worldView.x + 150, worldView.y + 250)
      this.buttonBomb.setPosition(worldView.x + 150, worldView.y + 350)
      this.buttonTeleport.setPosition(worldView.x + 150, worldView.y + 450)
    }

    this.field.resizeField(resizeData)
  }
}
