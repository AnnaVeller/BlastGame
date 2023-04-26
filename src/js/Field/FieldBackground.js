import {SETTINGS} from '../config'
import Container from '../Engine/Container'
import Sprite from '../Engine/Sprite'
import Tile from '../Engine/Tile'

export default class FieldBackground extends Container {
  constructor(config) {
    super(config)

    this.createBack()
  }

  createBack() {
    const {rows, cols} = this.config

    if (rows < 2 || cols < 2) return

    const {size} = SETTINGS

    const offsetRight = 34
    const offsetLeft = 51
    const offsetDown = 50
    const offsetTop = 30

    const field = new Sprite({
      scene: this.game,
      key: ['ui', 'fieldTile'],
      origin: {x: 0, y: 0},
      x: -86, y: -99,
      scale: {x: cols, y: rows + 0.14}
    })

    const cornerRB = new Sprite({
      scene: this.game,
      key: ['ui', 'corner'],
      x: size * (cols - 1 / 2) + offsetRight,
      y: size * (rows - 1 / 2) + offsetDown,
      origin: {x: 1, y: 1},
      scale: {x: 1, y: 1}
    })

    const cornerLB = new Sprite({
      scene: this.game,
      key: ['ui', 'corner'],
      x: -size + offsetLeft,
      y: size * (rows - 1 / 2) + offsetDown,
      origin: {x: 1, y: 1},
      scale: {x: -1, y: 1}
    })

    const cornerLT = new Sprite({
      scene: this.game,
      key: ['ui', 'corner'],
      x: -size + offsetLeft,
      y: -size + offsetTop,
      origin: {x: 1, y: 1},
      scale: {x: -1, y: -1}
    })

    const cornerRT = new Sprite({
      scene: this.game,
      key: ['ui', 'corner'],
      x: size * (cols - 1 / 2) + offsetRight,
      y: -size + offsetTop,
      origin: {x: 1, y: 1},
      scale: {x: 1, y: -1}
    })

    const rightBoard = new Tile({
      scene: this.game,
      x: size * (cols - 1 / 2) + offsetRight,
      y: size * 3 / 2,
      count: rows - 2,
      dy: size - 1, // лаг при спратйшитах - нужно вычесть пиксель
      imageTile: ['ui', 'frameTileV'],
    })

    const leftBoard = new Tile({
      scene: this.game,
      x: -size + offsetLeft,
      y: size * 3 / 2,
      count: rows - 2,
      dy: size - 1, // лаг при спратйшитах - нужно вычесть пиксель
      imageTile: ['ui', 'frameTileV'],
      scaleTile: {x: -1, y: 1},
    })

    const downBoard = new Tile({
      scene: this.game,
      x: size * 3 / 2,
      y: size * (rows - 1 / 2) + offsetDown,
      count: cols - 2,
      dx: size - 1, // лаг при спратйшитах - нужно вычесть пиксель
      imageTile: ['ui', 'frameTileH'],
      scaleTile: {x: 1, y: 1},
    })

    const topBoard = new Tile({
      scene: this.game,
      x: size * 3 / 2,
      y: -size + offsetTop,
      count: cols - 2,
      dx: size - 1, // лаг при спратйшитах - нужно вычесть пиксель
      imageTile: ['ui', 'frameTileH'],
      scaleTile: {x: 1, y: -1},
    })

    this.add([field, downBoard, topBoard, leftBoard, rightBoard, cornerRT, cornerLT, cornerLB, cornerRB])
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {}, config)
  }

}
