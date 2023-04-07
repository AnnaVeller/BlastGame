import {EVENTS, GAME_SETTINGS, TIME} from "../config"
import BlockStroke from "./BlockStroke"
import Container from "../Engine/Container"
import Shuffler from "./Shuffler"
import Creator from "./Creator"
import Finder from "./Finder"
import FallSettings from "./FallSettings"
import ResizerField from "./ResizerField"
import Teleport from "./Teleport"
import Animations from "./Animations"
import Explosion from "./Explosion"

export default class Field extends Container {
  constructor(config) {
    super(config)

    this.isEnable = true
    this.createBlocks()
  }

  createBlocks() {
    this.allBlocks = Creator.createBlocks(this)

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

  deleteCloseBlocks(mainBlock) {
    if (!this.isEnable) return false

    const {minCells, superBlockCount} = GAME_SETTINGS

    const delArray = Finder.recursiveFind(mainBlock, [], this.allBlocks)

    // не набрано минимальное кол-во одинаковых блоков рядом
    if (delArray.length < minCells) return false
    this.disable()

    if (delArray.length >= superBlockCount) {
      // выбрасываем из рассмотрения тапнутый блок
      delArray.splice(delArray.indexOf(mainBlock), 1)
      mainBlock.changeToSuperBlock()
    }

    this.startDeleteFallScenario(delArray)

    return true
  }

  deleteRadius(block, r) {
    if (!this.isEnable) return false

    this.disable()

    const delArray = Finder.getBlocksAround(block, r, this.allBlocks)

    delArray.forEach(el => this.add(new Explosion({scene: this.game, x: el.x, y: el.y})))

    this.startDeleteFallScenario(delArray, TIME.bombFallDelay)

    return true
  }

  deleteSuperBlock(superBlock) {
    this.deleteRadius(superBlock, GAME_SETTINGS.superBlockR)
  }

  // расположить фишки в верном порядке по высоте
  doCorrectDepth() {
    const {cols, rows} = GAME_SETTINGS

    for (let i = rows - 1; i >= 0; i--) {
      for (let j = cols - 1; j >= 0; j--) {
        this.bringToTop(this.allBlocks[i][j])
      }
    }
  }

  startDeleteFallScenario(delArray, fallDelay = 0) {
    const [fallArray, maxExecutionTime] = FallSettings.getFallArray(delArray, this.allBlocks)

    Animations.deleteAnimation(delArray)

    const timeAcc = 100 // ускоритель появления новых клеток после падения
    const timeAdd = 10 // добавка после спавна

    this.game.time.delayedCall(fallDelay, Animations.fallAnimation, [fallArray], this)
    this.game.time.delayedCall(maxExecutionTime - timeAcc + fallDelay, this.afterFall, [fallArray, delArray], this)
    this.game.time.delayedCall(maxExecutionTime - timeAcc + fallDelay, this.fillEmptyCells, [], this)
    this.game.time.delayedCall(maxExecutionTime - timeAcc + fallDelay + timeAdd + TIME.spawn, this.endAction, [delArray], this)
  }

  endAction(newBlocks) {
    this.enable()
    this.game.events.emit(EVENTS.endAction, newBlocks.length)
  }

  fillEmptyCells() {
    const [changeArray, spawnArray] = Creator.fillEmptyCells(this, this.allBlocks)
    this.allBlocks = changeArray
    spawnArray.forEach(el => this.add(el))
    this.doCorrectDepth()

    Animations.spawnAnimation(spawnArray)
  }

  // TODO как переписать?
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
    const {scale, x, y} = ResizerField.resize(data)

    this.scale = scale
    this.setPosition(x, y)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {}, config)
  }

}
