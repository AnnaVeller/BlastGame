import {GAME_SETTINGS} from '../config'

export default class Finder {

  // проверка на цвет блока
  static isSameColor(i, j, color, allBlocks) {
    const {rows, cols} = GAME_SETTINGS
    return i >= 0 && j >= 0 && i < rows && j < cols && allBlocks[i][j] && allBlocks[i][j].getColor() === color
  }

  // возвращает блок если совпадает по цвету
  static getBlock(i, j, color, allBlocks) {
    return this.isSameColor(i, j, color, allBlocks) ? allBlocks[i][j] : null
  }

  // возвращает такие же блоки по цвету сверху/снизу, справа/слева
  static getNearSameBlocks(i, j, color, allBlocks) {
    return [[i, j - 1], [i - 1, j], [i, j + 1], [i + 1, j]]
      .map(el => this.getBlock(el[0], el[1], color, allBlocks))
      .filter(el => el)
  }

  // возвращает массив исключенных из blocks excludeBlock
  static excludeBlocks(blocks, excludeBlocks) {
    return blocks.filter(block => !excludeBlocks.find(el => el.i === block.i && el.j === block.j))
  }

  static recursiveFind(newBlock, oldBlocks, allBlocks) {
    // новые блоки такого же цвета справа/слева/сверху/снизу, исключая уже записанные
    const newBlocks = this.excludeBlocks(this.getNearSameBlocks(newBlock.i, newBlock.j, newBlock.getColor(), allBlocks), oldBlocks)

    // новых блоков больше нет
    if (!newBlocks.length) return []

    // функция работает верно, тк oldBlocks хранится по ссылке
    oldBlocks.push(...newBlocks)

    newBlocks.forEach(block => this.recursiveFind(block, oldBlocks, allBlocks))

    return oldBlocks
  }

  static getElement(i, j, allBlocks) {
    const {rows, cols} = GAME_SETTINGS

    return i >= 0 && j >= 0 && i < rows && j < cols && allBlocks[i][j]
  }

  static addElement([...delArray], i, j, allBlocks) {
    const block = this.getElement(i, j, allBlocks)
    block && !delArray.includes(block) && delArray.push(block)

    return delArray
  }

  static getBlocksAround(block, radius, allBlocks) {
    let delArray = [block]
    const {i: iMain, j: jMain} = block

    // рассматриваем радиусы от iR=1 и до iR=r
    for (let iR = 1; iR < radius; iR++) {
      for (let j = 0; j <= iR; j++) {
        const i = iR - j // число в сумме с j равное текущему радиусу
        delArray = this.addElement(delArray, iMain - i, jMain - j, allBlocks)
        delArray = this.addElement(delArray, iMain + i, jMain - j, allBlocks)
        delArray = this.addElement(delArray, iMain - i, jMain + j, allBlocks)
        delArray = this.addElement(delArray, iMain + i, jMain + j, allBlocks)
      }
    }

    return delArray
  }

  static getBlocksLine(block, allBlocks) {
    let blockLine = [block]
    const {cols} = GAME_SETTINGS

    for (let j = 0; j < cols; j++) {
      blockLine = this.addElement(blockLine, block.i, j, allBlocks)
    }

    return blockLine
  }

  static getBlocksCol(block, allBlocks) {
    let blockLine = [block]
    const {rows} = GAME_SETTINGS

    for (let i = 0; i < rows; i++) {
      blockLine = this.addElement(blockLine, i, block.j, allBlocks)
    }

    return blockLine
  }
}
