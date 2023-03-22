import Phaser from 'phaser'
import GameScene from "./js/Scenes/GameScene"
import BootScene from "./js/Scenes/BootScene"
import StartScene from "./js/Scenes/StartScene"

export const GAME_DEFAULT_SIZE = 1700

const game = new Phaser.Game(
  {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: GAME_DEFAULT_SIZE,
    height: GAME_DEFAULT_SIZE,
    backgroundColor: '#2c2c2c',
    scene: [BootScene, StartScene, GameScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: '100%',
      height: '100%'
    },
  }
)
