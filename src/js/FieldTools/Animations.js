import {SETTINGS, TIME} from '../config'

export default class Animations {

  static fallAnimation(fallArray) {
    fallArray.forEach(el => el.block.blockFall(el.yCount, el.oneTime, el.delay))
  }

  static deleteAnimation(delArray) {
    delArray.forEach(block => block.deleteAnimation(TIME.delete))
  }

  static spawnAnimation(spawnArray) {
    spawnArray.forEach(block => block.spawnAnimation(TIME.spawn))
  }

  static moveAllBlocks(allBlocks, time) {
    const {size} = SETTINGS

    for (let i = allBlocks.length - 1; i >= 0; i--) {
      for (let j = allBlocks[i].length - 1; j >= 0; j--) {
        allBlocks[i][j].moveTo(j * size, i * size, time)
      }
    }
  }

  static moveBlocks(blocks, time) {
    const {size} = SETTINGS

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
      block.moveTo(block.j * size, block.i * size, time)
    }
  }

}
