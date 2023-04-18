import Sprite from '../Engine/Sprite'
import Container from '../Engine/Container'

export default class Bomb extends Container {
  constructor(config) {
    super(config)

    const bomb = new Sprite({scene: this.game, key: ['blocks', 'bomb'], angle: -5, x: 1, y: 18})
    const explosion = new Sprite({scene: this.game, key: ['blocks', 'explosion'], x: 47, y: -42})

    this.game.tweens.add({
      targets: explosion,
      scaleX: {from: 1, to: 0.97},
      scaleY: {from: 1, to: 0.95},
      duration: 100,
      yoyo: true,
      repeat: -1
    })

    this.game.tweens.add({
      targets: this,
      angle: 5,
      duration: 1000,
      yoyo: true,
      repeat: -1
    })

    this.add([bomb, explosion])
  }

}


