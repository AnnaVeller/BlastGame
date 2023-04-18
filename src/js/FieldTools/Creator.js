import {GAME_LEVEL, GAME_SETTINGS, IS_EXPORT_FIELD} from '../config'
import Block from '../Field/Block'

export default class Creator {

  static exportColor(i, j) {
    return !GAME_LEVEL[i][j] ? 'green' : GAME_LEVEL[i][j]
  }

  static getRandomColor(colors) {
    const rand = Math.floor(Math.random() * colors.length)

    return colors[rand]
  }

  static createBlocks(state, isExportField = IS_EXPORT_FIELD) {
    const {cols, rows, size, colors} = GAME_SETTINGS
    const allBlocks = Array.from(Array(rows), () => new Array(cols))

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        allBlocks[i][j] = new Block({
          scene: state.game,
          x: j * size, y: i * size,
          i: i, j: j,
          key: isExportField ? this.exportColor(i, j) : this.getRandomColor(colors)
        })

      }
    }

    return allBlocks
  }

  // TODO очень похоже на метод выше
  static fillEmptyCells(state, existArray) {
    const {cols, rows, size, colors} = GAME_SETTINGS
    const spawnArray = []
    const allBlocks = Array.from(Array(rows), () => new Array(cols))

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        if (existArray[i][j]) {
          allBlocks[i][j] = existArray[i][j]
          continue
        }

        const block = new Block({
          scene: state.game,
          x: j * size, y: i * size,
          i: i, j: j,
          isNew: true,
          visible: false,
          key: this.getRandomColor(colors)
        })

        allBlocks[i][j] = block
        spawnArray.push(block)
      }
    }

    return [allBlocks, spawnArray]
  }

}
