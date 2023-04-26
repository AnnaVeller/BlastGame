import BlockStroke from './BlockStroke'
import Container from '../Engine/Container'
import Shuffler from '../FieldTools/Shuffler'
import Creator from '../FieldTools/Creator'
import Finder from '../FieldTools/Finder'
import FallSettings from '../FieldTools/FallSettings'
import Resizer from '../FieldTools/Resizer'
import Teleport from '../FieldTools/Teleport'
import Animations from '../FieldTools/Animations'
import Explosion from './Explosion'
import FieldBackground from './FieldBackground'
import {STATE} from './Block'
import {EVENTS, TIME} from '../config'

export default class Field extends Container {
  constructor(config) {
    super(config)
  }

  reset(gameSettings) {
    this.gameSettings = gameSettings

    this.isEnable = true

    const l = this.list.length
    for (let i = 0; i < l; i++) {
      this.list[0].destroy()
    }

    const bg = new FieldBackground({
      scene: this.game,
      rows: this.gameSettings.rows,
      cols: this.gameSettings.cols
    })
    this.add(bg)

    this.createBlocks()
  }

  createBlocks() {
    this.allBlocks = Creator.createBlocks(this.game, this.gameSettings)

    this.allBlocks.forEach(row => row.forEach(el => this.add(el)))
    this.doCorrectDepth()
  }

  shuffleBlocks() {
    this.disable()

    this.allBlocks = Shuffler.shuffle(this.allBlocks)

    Animations.moveAllBlocks(this.allBlocks, TIME.shuffle)
    this.doCorrectDepth()

    this.game.time.delayedCall(TIME.shuffle, this.enable, [], this)
  }

  teleportBlocks(block1, block2) {
    if (!this.isEnable) return
    this.disable()

    Teleport.teleportBlocks(block1, block2, this.allBlocks)
    Animations.moveBlocks([block1, block2], TIME.teleport)

    this.bringToTop(block1)
    this.bringToTop(block2)

    this.game.time.delayedCall(TIME.teleport, this.doCorrectDepth, [], this)
    this.game.time.delayedCall(TIME.teleport, this.enable, [], this)
  }

  tryDeleteBlock(block) {
    if (!this.isEnable) return false

    if (block.getType() === STATE.simple) {
      return this.deleteCloseBlocks(block)
    }

    return this.deleteSuperBlock(block)
  }

  deleteCloseBlocks(mainBlock) {
    const {minCells, bombBlockCount, rocketBlockCount} = this.gameSettings

    const delArray = Finder.recursiveFind(mainBlock, [], this.allBlocks)

    // не набрано минимальное кол-во одинаковых блоков рядом
    if (delArray.length < minCells) return -1
    this.disable()

    if (delArray.length >= bombBlockCount) {
      // выбрасываем из рассмотрения тапнутый блок
      delArray.splice(delArray.indexOf(mainBlock), 1)
      mainBlock.changeToSuperBlock()
    } else if (delArray.length >= rocketBlockCount) {
      delArray.splice(delArray.indexOf(mainBlock), 1)
      mainBlock.changeToRocketBlock()
    }

    this.startDeleteFallScenario(delArray)

    return true
  }

  deleteRadius(block, r) {
    if (!this.isEnable) return false

    this.disable()

    let delArray = Finder.getBlocksAround(block, r, this.allBlocks)

    delArray = this.findDeletingBlocks(delArray)

    this.deleteBlocks(delArray)

    return true
  }

  deleteSuperBlock(block) {
    let addBlocks = [block] // блоки задеваемые на этой интерации

    const allDeleteBlocks = this.findDeletingBlocks(addBlocks)

    this.deleteBlocks(allDeleteBlocks)

    return 1
  }

  // ищет суперблоки среди удаляемых
  findDeletingBlocks(addBlocks) {
    const delArray = []

    do {
      const newDelBlocks = []

      for (let i = 0; i < addBlocks.length; i++) {
        const newBlocks = Finder.excludeBlocks(this.getDeletingBlocks(addBlocks[i]), delArray)
        newDelBlocks.push(...Finder.excludeBlocks(newBlocks, newDelBlocks))
      }

      delArray.push(...newDelBlocks)

      addBlocks = newDelBlocks.filter(block => block.getType() !== STATE.simple)

    } while (addBlocks.length)

    return delArray
  }

  getDeletingBlocks(block) {
    switch (block.getType()) {
      case STATE.bomb:
        return Finder.getBlocksAround(block, this.gameSettings.bombBlockR, this.allBlocks)
      case STATE.rocket:
        return Finder.getBlocksLine(block, this.allBlocks)
      case STATE.rocketVertical:
        return Finder.getBlocksCol(block, this.allBlocks)
      case STATE.simple:
        return [block]
    }
  }

  deleteBlocks(delArray) {
    this.disable()

    delArray.forEach(block => this.add(new Explosion({scene: this.game, x: block.x, y: block.y})))

    this.startDeleteFallScenario(delArray, TIME.fallDelay)
  }

  // расположить фишки в верном порядке по высоте
  doCorrectDepth() {
    for (let i = this.allBlocks.length - 1; i >= 0; i--) {
      for (let j = this.allBlocks[i].length - 1; j >= 0; j--) {
        this.bringToTop(this.allBlocks[i][j])
      }
    }
  }

  startDeleteFallScenario(delArray, fallDelay = 0) {
    const [fallArray, maxExecutionTime] = FallSettings.getFallArray(delArray, this.allBlocks)

    Animations.deleteAnimation(delArray)

    this.game.time.delayedCall(fallDelay, Animations.fallAnimation, [fallArray], this)
    this.game.time.delayedCall(maxExecutionTime - TIME.timeAcc + fallDelay, this.updateData, [fallArray, delArray], this)
    this.game.time.delayedCall(maxExecutionTime - TIME.timeAcc + fallDelay, this.spawnNewBlocks, [fallArray, delArray], this)
    this.game.time.delayedCall(maxExecutionTime - TIME.timeAcc + fallDelay + TIME.spawn, this.endMoveAnimation, [delArray], this)
  }

  updateData(fallArray, deletingArray) {
    // удаляем из базы эл-ты, которые лопнули
    deletingArray.forEach(block => this.allBlocks[block.i][block.j] = null)

    // записываем новые значения для упавших элементов
    fallArray.forEach(el => {
      this.allBlocks[el.block.i][el.block.j] = null

      el.block.i += el.yCount
      this.allBlocks[el.block.i][el.block.j] = el.block
    })
  }

  spawnNewBlocks() {
    const [changeArray, spawnArray] = Creator.fillEmptyCells(this.game, this.allBlocks, this.gameSettings)
    this.allBlocks = changeArray
    spawnArray.forEach(el => this.add(el))
    this.doCorrectDepth()

    Animations.spawnAnimation(spawnArray)
  }

  // запускается после окончания всех анимаций хода
  endMoveAnimation(delBlocks) {
    this.enable()

    // дестроим все удаленные кубы
    delBlocks.forEach(el => el.destroy())

    this.game.events.emit(EVENTS.endAction, delBlocks.length)
  }

  createStroke(block) {
    const stroke = new BlockStroke({scene: this.game, x: block.x, y: block.y})
    this.add(stroke)
  }

  deleteStrokes() {
    this.list.filter(el => el instanceof BlockStroke).forEach(el => el.destroy())
  }

  deleteStroke(block) {
    this.list.filter(el => el instanceof BlockStroke)
      .find(stroke => stroke.x === block.x && stroke.y === block.y).destroy()
  }

  disable() {
    this.isEnable = false
  }

  enable() {
    this.isEnable = true
  }

  resizeField(data) {
    const {scale, x, y} = Resizer.resize(data, this.gameSettings)

    this.scale = scale
    this.setPosition(x, y)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {}, config)
  }

}
