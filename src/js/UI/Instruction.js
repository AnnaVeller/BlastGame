import Container from '../Engine/Container'
import {GAME_SETTINGS, LEVELS, START_LEVEL} from '../configLevels'
import BitmapText from '../Engine/BitmapText'

export default class Instruction extends Container {
  constructor(config) {
    super(config)

    const {points, moves, bombs, shuffles, teleports} = {...GAME_SETTINGS, ...LEVELS[START_LEVEL]}

    const text1 = new BitmapText({
      scene: this.game,
      x: 50, y: -100,
      alpha: 1,
      text: `Набери ${points} очков за ${moves} ходов`,
      fontSize: 34,
    })

    const text2 = new BitmapText({
      scene: this.game,
      x: 30, y: 0,
      alpha: 0.9,
      text: `У тебя есть:`,
      fontSize: 30,
    })

    const text3 = new BitmapText({
      scene: this.game,
      x: 50, y: 60,
      alpha: 0.9,
      text: `
      - ${bombs} бомбы
      - ${shuffles} перемешиваний
      - ${teleports} телепортов`,
      fontSize: 26,
    })

    this.add([text1, text2, text3])
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {x: 650, y: 650}, config)
  }

}
