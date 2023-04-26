import {SETTINGS} from '../config'

export default class Resizer {

  static resize({height, width, scaleFactor, isLandscape, midX, midY, aspectRatio, cornerLT}, {cols, rows}) {
    const {size} = SETTINGS

    const fieldHeight = rows * size
    const fieldWidth = cols * size

    let scale, x, y

    if (isLandscape) {
      // горизонталка
      scale = height / fieldHeight * 0.9 / scaleFactor

      if (scale > 0.7) scale = 0.7

      // вытянутое по горизонали поле
      if (fieldWidth > fieldHeight && width < fieldWidth * scale) {
        scale = width / fieldWidth * 0.9
      }

      x = midX * 2 - (fieldWidth - size / 2 + 50) * scale - (aspectRatio - 1) * 200
      y = midY + (size / 2 - fieldHeight / 2) * scale
    } else {
      // вертикалка
      scale = width / fieldWidth * 0.9 / scaleFactor

      if (scale > 0.7) scale = 0.7

      // вытянутое по горизонали поле
      if (fieldHeight > fieldWidth && height < fieldHeight * scale) {
        scale = height / fieldHeight * 0.9 / scaleFactor
      }

      x = midX - (fieldWidth / 2 - size / 2) * scale
      y = cornerLT.y + 400
    }

    return {scale, x, y}
  }
}
