import {GAME_DEFAULT_SIZE} from "../../index"

export function resize(state) {
  const width = state.scale.gameSize.width // this.cameras.main.width // gameSize.width
  const height = state.scale.gameSize.height // this.cameras.main.height // gameSize.height
  const aspectRatio = state.scale.gameSize.aspectRatio // отношение ширины изображения к его высоте

  const isLandscape = aspectRatio > 1

  state.cameras.main.centerOn(GAME_DEFAULT_SIZE / 2, GAME_DEFAULT_SIZE / 2)

  const scaleFactor = (isLandscape ? width : height) / GAME_DEFAULT_SIZE
  state.cameras.main.zoom = scaleFactor
}

export function getWorldView(camera) {
  // this.cameras.main.worldView - в начале работает некорректно

  return {
    x: camera.midPoint.x - (camera.displayWidth / 2),
    y: camera.midPoint.y - (camera.displayHeight / 2)
  }
}
