import {GAME_SETTINGS} from '../config'

export default class Resizer {

  static resize({height, width, scaleFactor, isLandscape, midX, midY, aspectRatio}) {
    const {cols, rows, size} = GAME_SETTINGS

    const fieldHeight = rows * size
    const fieldWidth = cols * size

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
      y = midY * 2 + (size / 2 - fieldHeight - 120) * scale - (1 - aspectRatio) * 300
    }

    return {scale, x, y}
  }
}
