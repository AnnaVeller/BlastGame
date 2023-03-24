import Phaser from "phaser"
import {getWorldView, resize} from "../Engine/resizer"
import Sprite from "../Engine/Sprite"
import Block from "../Sprites/Block"
import {EVENTS} from "../config"
import {GAME_DEFAULT_SIZE} from "../../index";

const ROWS = 6
const COLS = 6
const SIZE = 171
const MIN_CELLS = 2 // минимальное кол-во клеток для удаления
const FIELD_SIZE = {w: COLS * SIZE, h: ROWS * SIZE}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  init() {
    this.sprites = {}
    this.containers = {}

    this.isEnable = true
  }

  create() {
    this.allBlocks = Array.from(Array(ROWS), () => new Array(COLS))
    this.fieldContainer = this.add.container(150, 150)

    for (let i = ROWS - 1; i >= 0; i--) {
      for (let j = COLS - 1; j >= 0; j--) {
        const block = new Block(this, {
          x: j * SIZE,
          y: i * SIZE,
          i: i, j: j,
          key: this.getRandomColor()
        })

        this.fieldContainer.add(block.content)
        this.allBlocks[i][j] = block
      }
    }

    this.events.on(EVENTS.blockTap, (block) => {
      this.deleteCloseBlocks(block)
    })

    this.scale.on('resize', this.resize, this)
    this.resize(this.scale.gameSize)
  }

  getRandomColor() {
    const colors = ['blue', 'green', 'purple', 'red', 'yellow']
    const rand = Math.floor(Math.random() * colors.length)

    return colors[rand]
  }

  deleteCloseBlocks(mainBlock) {
    const newBlocks = this.recursiveFind(mainBlock, [mainBlock])

    if (newBlocks.length >= MIN_CELLS) {
      newBlocks.forEach(el => el.deleteAnimation())
    }
  }

  // TODO результат правильный, но много раз сюда заходит
  recursiveFind(newBlock, oldBlocks) {
    // новые блоки такого же цвета справа/слева/сверху/снизу, исключая уже записанные
    const newBlocks = this.excludeBlocks(this.getNearSameBlocks(newBlock.i, newBlock.j, newBlock.color), oldBlocks)
    oldBlocks.push(...newBlocks)

    // Тут ненужное разветвление. поч работает, но ничего не возвращается??
    newBlocks.forEach(block => this.recursiveFind(block, oldBlocks))

    // новых блоков больше нет
    if (!newBlocks.length) return []

    // console.log(oldBlocks)
    return oldBlocks
  }

  // возвращает массив исключенных из blocks excludeBlock
  excludeBlocks(blocks, excludeBlock) {
    return blocks.filter(block => !excludeBlock.find(el => el.i === block.i && el.j === block.j))
  }

  // возвращает такие же блоки по цвету сверху/снизу, справа/слева
  getNearSameBlocks(i, j, color) {
    return [[i, j - 1], [i - 1, j], [i, j + 1], [i + 1, j]]
      .map(el => this.getBlock(el[0], el[1], color))
      .filter(el => el)
  }

  // возвращает блок если совпадает по цвету
  getBlock(i, j, color) {
    return this.isSameColor(i, j, color) ? this.allBlocks[i][j] : null
  }

  // проверка на цвет блока
  isSameColor(i, j, color) {
    return i >= 0 && j >= 0 && i < ROWS && j < COLS && this.allBlocks[i][j].color === color
  }

  update(time, delta) {
  }

  resize() {
    // сцена продолжает работать, даже если мы ушли отсюда
    if (!this.scene.settings.active) return

    resize(this)

    const midX = this.cameras.main.midPoint.x
    const midY = this.cameras.main.midPoint.y

    // левый вверх экрана
    const worldView = getWorldView(this.cameras.main)

    const width = this.scale.gameSize.width // this.cameras.main.width // gameSize.width
    const height = this.scale.gameSize.height // this.cameras.main.height // gameSize.height

    const aspectRatio = this.scale.gameSize.aspectRatio // отношение ширины изображения к его высоте
    this.isLandscape = aspectRatio > 1

    const scaleFactor = (this.isLandscape ? width : height) / GAME_DEFAULT_SIZE

    if (this.isLandscape) {
      const scale = height / FIELD_SIZE.h * 0.9
      this.fieldContainer.scale = scale
      this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
        worldView.y + 171 / 2)
    } else {
      const scale = width / FIELD_SIZE.w * 0.9
      this.fieldContainer.scale = scale
      this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
        worldView.y + 171 / 2)
    }

    // const midX = this.cameras.main.midPoint.x
    // const midY = this.cameras.main.midPoint.y
    //
    // // левый вверх экрана
    // const worldView = getWorldView(this.cameras.main)
    //
    // // правый низ экрана
    // const bottomScreen = {
    //   x: worldView.x + this.cameras.main.displayWidth,
    //   y: worldView.y + this.cameras.main.displayHeight
    // }
    //
    // const aspectRatio = this.scale.gameSize.aspectRatio // отношение ширины изображения к его высоте
    // this.isLandscape = aspectRatio > 1
    //
    // const width = this.scale.gameSize.width // this.cameras.main.width // gameSize.width
    // const height = this.scale.gameSize.height // this.cameras.main.height // gameSize.height
    //
    // const scaleFactor = (this.isLandscape ? width : height) / GAME_DEFAULT_SIZE
    //
    // // if (this.isLandscape) {
    // //   const scale = height / FIELD_SIZE.h * 0.95
    // //   this.fieldContainer.scale = scale
    // //   this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    // //     worldView.y + 171 / 2)
    // //
    // // } else {
    // //   const scale = 1.2
    // //   console.log(height, FIELD_SIZE.h)
    // //
    // //   this.fieldContainer.scale = scale
    // //   this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    // //     worldView.y + 171 / 2)
    // // }
    //
    // if (FIELD_SIZE.w > FIELD_SIZE.h) {
    //   // вытянутое поле горизонтально
    //
    //   if (this.isLandscape) {
    //     const scale = height / FIELD_SIZE.h * 0.95
    //     this.fieldContainer.scale = scale
    //     this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    //       worldView.y + 171 / 2)
    //
    //   } else {
    //     // const scale = 1.2
    //     // console.log(height, FIELD_SIZE.h)
    //     //
    //     // this.fieldContainer.scale = scale
    //     // this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    //     //   worldView.y + 171 / 2)
    //   }
    // } else {
    //   // вытянутое поле вертикально
    //   if (this.isLandscape) {
    //     const scale = height / FIELD_SIZE.h * 0.95
    //     this.fieldContainer.scale = scale
    //     this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    //       worldView.y + 171 / 2)
    //
    //   } else {
    //     // const scale = 1.2
    //     // console.log(height, FIELD_SIZE.h)
    //     //
    //     // this.fieldContainer.scale = scale
    //     // this.fieldContainer.setPosition(midX - (FIELD_SIZE.w / 2 - 171 / 2) * scale,
    //     //   worldView.y + 171 / 2)
    //   }
    // }

  }

}
