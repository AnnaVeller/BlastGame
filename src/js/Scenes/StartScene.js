import Phaser from "phaser"
import {resize} from "../Engine/resizer"
import Sprite from "../Engine/Sprite"
import BitmapText from "../Engine/BitmapText"
import {GAME_SETTINGS} from "../config"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('Start')
  }

  create() {
    new Sprite({scene: this, key: 'bg', origin: {x: 0, y: 0}})
    new Sprite({scene: this, key: 'panel', x: 700, y: 700, scale: {x: 0.65, y: 0.6}})

    this.input.on('pointerdown', () => this.scene.start('Game'), this)

    const {points, moves, bombs, shuffles, teleports} = GAME_SETTINGS

    new BitmapText({
      scene: this,
      x: 700, y: 550,
      alpha: 1,
      text: `Набери ${points} очков за ${moves} ходов`,
      fontSize: 34,
    })

    new BitmapText({
      scene: this,
      x: 680, y: 650,
      alpha: 0.9,
      text: `У тебя есть:`,
      fontSize: 30,
    })

    new BitmapText({
      scene: this,
      x: 700, y: 710,
      alpha: 0.9,
      text: `
      - ${bombs} бомбы
      - ${shuffles} перемешивания
      - ${teleports} телепортов`,
      fontSize: 26,
    })

    const tapMessage = new BitmapText({
      scene: this,
      x: 700, y: 890,
      text: 'Нажмите, чтобы приступить',
      alpha: 0.8,
      fontSize: 30,
      tint: 0x92de1c
    })

    this.tweens.add({
      targets: tapMessage,
      alpha: 1,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 300,
      yoyo: true,
      repeat: -1
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  resize() {
    // стоп ресайза, если ушли с этой сцены
    if (!this.scene.settings.active) return

    resize(this)
  }

}


