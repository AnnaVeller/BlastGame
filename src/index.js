import Phaser from 'phaser'
import GameScene from "./js/Scenes/GameScene"
import BootScene from "./js/Scenes/BootScene"
import StartScene from "./js/Scenes/StartScene"
import WinScene from "./js/Scenes/WinScene"
import FailScene from "./js/Scenes/FailScene"
import UIScene from "./js/Scenes/UIScene"

export const GAME_DEFAULT_SIZE = 1400

const game = new Phaser.Game(
  {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: GAME_DEFAULT_SIZE,
    height: GAME_DEFAULT_SIZE,
    backgroundColor: '#2c2c2c',
    scene: [BootScene, StartScene, GameScene, WinScene, FailScene, UIScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: '100%',
      height: '100%'
    },
  }
)
