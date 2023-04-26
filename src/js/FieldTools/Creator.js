import {SETTINGS} from '../config'
import Block from '../Field/Block'

export default class Creator {

  static getRandomColor(colors) {
    const rand = Math.floor(Math.random() * colors.length)

    return colors[rand]
  }

  static createBlocks(scene, {cols, rows, colors}) {
    const [allBlocks] = this._createBlocks(scene, null, {cols, rows, colors}, true)
    return allBlocks
  }

  static fillEmptyCells(scene, existArray, {cols, rows, colors}) {
    const [allBlocks, spawnArray] = this._createBlocks(scene, existArray, {cols, rows, colors}, false)

    return [allBlocks, spawnArray]
  }

  static _createBlocks(scene, existArray, {cols, rows, colors}, visible) {
    const spawnArray = [] // массив блоков, которые мы создаем сейчас
    const {size} = SETTINGS
    const allBlocks = Array.from(Array(rows), () => new Array(cols)) // полный массив блоков

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        // существующие блоки не перезаписываем
        if (existArray && existArray[i][j]) {
          allBlocks[i][j] = existArray[i][j]
          continue
        }

        const block = new Block({
          scene,
          x: j * size, y: i * size,
          i: i, j: j,
          visible,
          key: this.getRandomColor(colors)
        })

        allBlocks[i][j] = block
        spawnArray.push(block)
      }
    }

    return [allBlocks, spawnArray]
  }

}
