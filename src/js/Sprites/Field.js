import {GAME_SETTINGS} from "../config"
import Block from "./Block"

export default class Field {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)

    this.createBlocks()
  }

  createBlocks() {
    this.container = this.game.add.container(this.config.x, this.config.y)

    const {cols, rows, size, colors} = GAME_SETTINGS
    this.allBlocks = Array.from(Array(rows), () => new Array(cols))

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        const block = new Block(this.game, {
          x: j * size,
          y: i * size,
          i: i, j: j,
          key: this.getRandomColor(colors)
        })

        this.container.add(block.content)
        this.allBlocks[i][j] = block
      }
    }
  }

  getRandomColor(colors) {
    const rand = Math.floor(Math.random() * colors.length)

    return colors[rand]
  }

  deleteCloseBlocks(mainBlock) {
    const {minCells} = GAME_SETTINGS

    const newBlocks = this.recursiveFind(mainBlock, [mainBlock])

    if (newBlocks.length >= minCells) {
      newBlocks.forEach(el => el.deleteAnimation())
    }
  }

  recursiveFind(newBlock, oldBlocks) {
    // новые блоки такого же цвета справа/слева/сверху/снизу, исключая уже записанные
    const newBlocks = this.excludeBlocks(this.getNearSameBlocks(newBlock.i, newBlock.j, newBlock.color), oldBlocks)

    // новых блоков больше нет
    if (!newBlocks.length) return []

    // функция работает верно, тк oldBlocks хранится по ссылке
    oldBlocks.push(...newBlocks)

    newBlocks.forEach(block => this.recursiveFind(block, oldBlocks))

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
    const {rows, cols} = GAME_SETTINGS

    return i >= 0 && j >= 0 && i < rows && j < cols && this.allBlocks[i][j].color === color
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }

}


