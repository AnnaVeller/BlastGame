import {EVENTS, GAME_LEVEL, GAME_SETTINGS, IS_EXPORT_FIELD} from "../config"
import Block from "./Block"

export default class Field extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y)
    config.scene.add.existing(this)

    this.game = config.scene
    this.config = this.getDefaultConfig(config)

    this.isEnable = true

    const {cols, rows} = GAME_SETTINGS

    this.allBlocks = Array.from(Array(rows), () => new Array(cols))

    this.createBlocks()
  }

  shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  shuffle() {
    this.disable()

    const newBlocks = this.allBlocks.map((item) => [...item])

    const indexArray = []

    for (let i = 0; i < this.allBlocks.length; i++) {
      for (let j = 0; j < this.allBlocks[0].length; j++) {
        indexArray.push([i, j])
      }
    }

    const shuffledArray = this.shuffleArray(indexArray)

    const {cols, rows} = GAME_SETTINGS

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const block = this.allBlocks[i][j]
        const indexes = shuffledArray.pop()
        block.i = indexes[0]
        block.j = indexes[1]
        newBlocks[block.i][block.j] = block
      }
    }

    this.allBlocks = newBlocks

    this.refreshField()
  }

  refreshField() {
    const {cols, rows, size} = GAME_SETTINGS

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {

        // this.allBlocks[i][j].setPosition(j * size, i * size)
        this.allBlocks[i][j].moveTo(j * size, i * size, 500)
        this.bringToTop(this.allBlocks[i][j])

      }
    }

    this.game.time.delayedCall(500, this.enable, [], this)
  }

  exportColor(i, j) {
    return !GAME_LEVEL[i][j] ? 'green' : GAME_LEVEL[i][j]
  }

  createBlocks() {
    const {cols, rows, size, colors} = GAME_SETTINGS

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        const block = new Block({
          scene: this.game,
          x: j * size,
          y: i * size,
          i: i, j: j,
          key: IS_EXPORT_FIELD ? this.exportColor(i, j) : this.getRandomColor(colors)
        })

        this.add(block)
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

    const {minCells} = GAME_SETTINGS

    const newBlocks = this.recursiveFind(mainBlock, [mainBlock])

    // не набрано минимальное кол-во одинаковых блоков рядом
    if (newBlocks.length < minCells) {
      return
    }

    this.game.events.emit(EVENTS.moveDone)
    this.game.events.emit(EVENTS.deleteBlocks, newBlocks.length)

    this.disable()

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

        const block = new Block({
          scene: this.game,
          x: j * size,
          y: i * size,
          i: i, j: j,
          visible: false,
          key: this.getRandomColor(colors)
        })

        this.add(block)
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

  getDefaultConfig(config) {
    return Object.assign({x: 0, y: 0}, config)
  }

  resizeField({height, width, scaleFactor, isLandscape, midX, midY, aspectRatio}) {
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

    this.scale = scale
    this.setPosition(x, y)
  }


}


