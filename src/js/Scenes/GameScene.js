import Phaser from 'phaser'
import {resize} from '../Engine/resizer'
import Field from '../Field/Field'
import Label from '../UI/Label'
import Sprite from '../Engine/Sprite'
import BombBuster from '../UI/BombBuster'
import TeleportBuster from '../UI/TeleportBuster'
import MixBuster from '../UI/MixBuster'
import {EVENTS, TIME, SOUNDS} from '../config'
import {GAME_SETTINGS, LEVELS, START_LEVEL} from '../configLevels'
import Level from '../UI/Level'

const STATE = {
  game: 'game',
  mix: 'mix',
  bomb: 'bomb',
  teleport: 'teleport',
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')

    this.level = START_LEVEL
  }

  init() {
    this.gameSettings = {...GAME_SETTINGS, ...LEVELS[this.level]}

    this.audioSystem = this.scene.get('UI').getAudioSystem()

    this.moves = this.gameSettings.moves
    this.shuffles = this.gameSettings.shuffles
    this.points = 0
    this.bombs = this.gameSettings.bombs
    this.teleports = this.gameSettings.teleports
    this.state = STATE.game
    this.blocksTap = []
  }

  create() {
    new Sprite({scene: this, key: 'bg', origin: {x: 0, y: 0}})

    this.field = new Field({scene: this, x: 150, y: 150})
    this.labelPoints = new Label({scene: this, name: 'Очки'})
    this.labelMoves = new Label({scene: this, name: 'Ходы'})
    this.buttonMix = new MixBuster({scene: this})
    this.buttonBomb = new BombBuster({scene: this})
    this.buttonTeleport = new TeleportBuster({scene: this})
    this.levelLabel = new Level({scene: this})

    this.events.on(EVENTS.blockTap, this.onBlockTap, this) // тап на блок
    this.events.on(EVENTS.pressShuffle, this.pressShuffle, this)
    this.events.on(EVENTS.pressBomb, this.pressBomb, this)
    this.events.on(EVENTS.pressTeleport, this.pressTeleport, this)
    this.events.on(EVENTS.endAction, this.endAction, this)

    this.scale.on('resize', this.resize, this)

    this.resetScene()
  }

  resetScene() {
    this.init()
    this.labelPoints.resetText(0, this.gameSettings.points)
    this.labelMoves.resetText(this.moves, this.moves)
    this.buttonMix.reset(this.shuffles)
    this.buttonBomb.reset(this.bombs)
    this.buttonTeleport.reset(this.teleports)
    this.field.reset(this.gameSettings)
    this.levelLabel.setText(this.level)

    this.enable()
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

    this.audioSystem.play(SOUNDS.shuffle)

    this.setMixState()
    this.field.shuffleBlocks()
    this.buttonMix.setText(--this.shuffles)
    this.time.delayedCall(TIME.shuffle, this.setGameState, [], this)
  }

  endAction(count) {
    this.points += count
    this.labelPoints.setText(this.points)

    // проверка не закончилась ли игра
    if (this.points >= this.gameSettings.points || !this.moves) {
      this.endGame()
    }
  }

  onBlockTap(block) {
    if (!this.isEnable || !this.field.isEnable) return

    switch (this.state) {

      case STATE.game:
        const canDelete = this.field.tryDeleteBlock(block)

        if (!canDelete) return

        if (canDelete === -1) {
          block.wrongAnimation()
          this.audioSystem.play(SOUNDS.error)
          return
        }

        if (canDelete === 1) {
          this.audioSystem.play(SOUNDS.explosion)

        } else {
          this.audioSystem.play(SOUNDS.tap)
        }

        this.labelMoves.setText(--this.moves)
        break

      case STATE.bomb:
        const canDeleteBomb = this.field.deleteRadius(block, this.gameSettings.bombR)

        if (!canDeleteBomb) return

        this.audioSystem.play('explosion')
        this.buttonBomb.setText(--this.bombs)
        this.setGameState()
        break

      case STATE.teleport:
        this.audioSystem.play('click')

        if (this.blocksTap.includes(block)) {
          // убираем блок из выбранных
          this.field.deleteStroke(block)
          this.blocksTap.splice(this.blocksTap.indexOf(block), 1)

        } else {
          this.blocksTap.push(block)
          this.field.createStroke(block)

          if (this.blocksTap.length === 2) {
            this.audioSystem.play('move')

            this.field.deleteStrokes()

            this.field.teleportBlocks(this.blocksTap[0], this.blocksTap[1])
            this.buttonTeleport.setText(--this.teleports)
            this.setGameState()
            this.blocksTap = []
          }
        }
        break
    }
  }

  deleteTeleportSettings() {
    this.field.deleteStrokes()
    this.blocksTap = []
  }

  setMixState() {
    this.audioSystem.play(SOUNDS.buttonClick)

    this.state = STATE.mix
    this.buttonMix.showChoose()
    this.buttonBomb.hideChoose()
    this.buttonTeleport.hideChoose()
    this.deleteTeleportSettings()
  }

  setTeleportState() {
    if (this.state === STATE.mix) return

    this.audioSystem.play(SOUNDS.buttonClick)

    this.state = STATE.teleport
    this.buttonTeleport.showChoose()
    this.buttonBomb.hideChoose()
  }

  setBombState() {
    if (this.state === STATE.mix) return

    this.audioSystem.play(SOUNDS.buttonClick)

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
    if (!this.isEnable) return
    this.disable()

    this.points >= this.gameSettings.points && this.winGame()
    this.points < this.gameSettings.points && this.failGame()

    this.buttonMix.disableInteractive()
    this.buttonBomb.disableInteractive()
    this.buttonTeleport.disableInteractive()
  }

  winGame() {
    this.audioSystem.play(SOUNDS.win)

    this.level += 1
    this.scene.launch('Win')
  }

  failGame() {
    this.audioSystem.play(SOUNDS.fail)

    this.scene.launch('Fail')
  }

  resize() {
    if (!this.scene.settings.active) return

    const resizeData = resize(this)

    const {isLandscape, cornerLT, cornerRB, midX} = resizeData

    if (isLandscape) {

      this.levelLabel.setPosition(cornerLT.x + 150, cornerLT.y + 60)
      this.labelPoints.setPosition(cornerLT.x + 150, midX - 230)
      this.labelMoves.setPosition(cornerLT.x + 150, midX - 130)

      this.buttonMix.setPosition(cornerLT.x + 150, midX + 0)
      this.buttonBomb.setPosition(cornerLT.x + 150, midX + 100)
      this.buttonTeleport.setPosition(cornerLT.x + 150, midX + 200)
    } else {
      this.levelLabel.setPosition(cornerLT.x + 150, 50)
      this.labelPoints.setPosition(cornerLT.x + 150, 150)
      this.labelMoves.setPosition(cornerLT.x + 150, 250)

      this.buttonMix.setPosition(cornerRB.x - 140, cornerLT.y + 50)
      this.buttonBomb.setPosition(cornerRB.x - 140, cornerLT.y + 150)
      this.buttonTeleport.setPosition(cornerRB.x - 140, cornerLT.y + 250)
    }

    this.field.resizeField(resizeData)
  }
}
