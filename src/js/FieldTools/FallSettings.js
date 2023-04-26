import {TIME} from '../config'

export default class FallSettings {

  // расставляет элементы по колонкам
  static sortByCols(els) {
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
  static findDeltaYArray(value) {
    const deltaY = []

    for (let i = value[0]; i >= 0; i--) {
      const count = value.filter(el => el > i).length
      if (!count) continue
      deltaY.push(value.includes(i) ? 0 : count)
    }

    return deltaY
  }

  static getFallSettings([...deletingBLock]) {
    const settings = {}
    const cols = this.sortByCols(deletingBLock)

    Object.keys(cols).forEach(key => {
      const value = cols[key].sort((a, b) => b - a)

      const deltaY = this.findDeltaYArray(value)
      const index = deltaY.findIndex(el => el !== 0)

      while (deltaY[0] === 0) {
        deltaY.shift()
      }

      settings[`${value[index]},${key}`] = deltaY
    })

    return settings
  }

  static getFallArray(delArr, allBlocks) {
    const settings = this.getFallSettings(delArr)

    /*
    * const settings = {
    *    1,4: [5],
    *    3,2: [3, 3, 3],
    *    3,3: [1, 1, 1],
    *    5,5: [1, 0, 2, 0, 3]
    *  }
    *  */

    const drawArray = []

    let maxExecutionTime = 0
    for (const [cell, conditions] of Object.entries(settings)) {

      for (let i = 0; i < conditions.length; i++) {
        if (!conditions[i]) continue

        const timeExecution = i * TIME.delayFall + TIME.fallOneCell * conditions[i]

        const cellArray = cell.split(',')

        // если поле не прямоугольное (напр. сложная форма)
        if (!allBlocks[cellArray[0] - i - 1][cellArray[1]]) continue

        drawArray.push({
          block: allBlocks[cellArray[0] - i - 1][cellArray[1]],
          oneTime: TIME.fallOneCell,
          delay: i * TIME.delayFall,
          yCount: conditions[i]
        })

        if (maxExecutionTime < timeExecution) maxExecutionTime = timeExecution
      }
    }

    return [drawArray, maxExecutionTime]
  }
}
