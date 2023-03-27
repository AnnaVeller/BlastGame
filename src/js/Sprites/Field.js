import {EVENTS, GAME_LEVEL, GAME_SETTINGS, IS_EXPORT_FIELD} from "../config"
import Block from "./Block"

export default class Field {
  constructor(game, config) {
    this.game = game
    this.config = this.getObject(config)
    this.isEnable = true

    const {cols, rows} = GAME_SETTINGS

    this.container = this.game.add.container(this.config.x, this.config.y)
    this.allBlocks = Array.from(Array(rows), () => new Array(cols))

    this.createBlocks()
  }

  exportColor(i, j) {
    return !GAME_LEVEL[i][j] ? 'green' : GAME_LEVEL[i][j]
  }

  createBlocks() {
    const {cols, rows, size, colors} = GAME_SETTINGS

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        const block = new Block(this.game, {
          x: j * size,
          y: i * size,
          i: i, j: j,
          key: IS_EXPORT_FIELD ? this.exportColor(i, j) : this.getRandomColor(colors)
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
    if (!this.isEnable) return
    this.disable()

    const {minCells} = GAME_SETTINGS

    const newBlocks = this.recursiveFind(mainBlock, [mainBlock])

    // не набрано минимальное кол-во одинаковых блоков рядом
    if (newBlocks.length < minCells) {
      this.enable()
      return
    }

    this.game.events.emit(EVENTS.moveDone)
    this.game.events.emit(EVENTS.deleteBlocks, newBlocks.length)

    newBlocks.forEach(block => block.deleteAnimation())
    const [fallArray, maxExecutionTime] = this.drawFall(this.getFallSettings(newBlocks))

    fallArray.forEach(el => el.block.blockFall(el.yCount, el.oneTime, el.delay))
    this.game.time.delayedCall(maxExecutionTime - 150, this.afterFall, [fallArray, newBlocks], this)
    this.game.time.delayedCall(maxExecutionTime - 150 + 350, this.enable, [], this)
  }

  fillEmptyCells() {
    const {cols, rows, size, colors} = GAME_SETTINGS

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        if (this.allBlocks[i][j]) continue

        const block = new Block(this.game, {
          x: j * size,
          y: i * size,
          i: i, j: j,
          visible: false,
          key: this.getRandomColor(colors)
        })

        this.container.add(block.content)
        this.allBlocks[i][j] = block

        block.spawnAnimation()
      }
    }

  }

  afterFall(fallArray, deletingArray) {
    deletingArray.forEach(block => {
      delete this.allBlocks[block.i][block.j]
      this.allBlocks[block.i][block.j] = null
    })

    fallArray.forEach(el => {
      this.allBlocks[el.block.i][el.block.j] = null

      el.block.i += el.yCount
      this.allBlocks[el.block.i][el.block.j] = el.block
    })

    this.fillEmptyCells()
  }

  // расставляет элементы по колонкам
  sortByCols(els) {
    const cols = {}

    els.forEach(el => {
      if (!cols[el.j]) {
        cols[el.j] = []
      }

      cols[el.j].push(el.i)
    })

    return cols
  }

  // находит массив фишек, которые будут падать
  findDeltaYArray(value) {
    const deltaY = []

    for (let i = value[0]; i >= 0; i--) {
      const count = value.filter(el => el > i).length
      if (!count) continue
      deltaY.push(value.includes(i) ? 0 : count)
    }

    return deltaY
  }

  getFallSettings([...deletingBLock]) {
    const settings = {}
    const cols = this.sortByCols(deletingBLock)

    Object.keys(cols).forEach(key => {
      const value = cols[key].sort((a, b) => b - a)

      const deltaY = this.findDeltaYArray(value)
      const index = deltaY.findIndex(el => el !== 0)

      while (deltaY[0] === 0) {
        deltaY.shift()
      }

      settings[`${value[index]}${key}`] = deltaY
    })

    return settings
  }

  drawFall(settings) {
    // const settings = {
    //   14: [5],
    //   32: [3, 3, 3],
    //   33: [1, 1, 1],
    //   55: [1, 0, 2, 0, 3]
    // }

    const drawArray = []

    let maxExecutionTime = 0
    for (const [cell, conditions] of Object.entries(settings)) {

      for (let i = 0; i < conditions.length; i++) {
        if (!conditions[i]) continue

        const timeExecution = i * 50 + 150 * conditions[i]

        // если поле не прямоугольное (напр. сложная форма)
        if (!this.allBlocks[cell[0] - i - 1][cell[1]]) continue

        drawArray.push({
          block: this.allBlocks[cell[0] - i - 1][cell[1]],
          oneTime: 120,
          delay: i * 50,
          yCount: conditions[i]
        })

        if (maxExecutionTime < timeExecution) maxExecutionTime = timeExecution
      }
    }

    return [drawArray, maxExecutionTime]
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
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

    return i >= 0 && j >= 0 && i < rows && j < cols && this.allBlocks[i][j] && this.allBlocks[i][j].color === color
  }

  getObject(config) {
    return Object.assign({x: 0, y: 0}, config)
  }

}


