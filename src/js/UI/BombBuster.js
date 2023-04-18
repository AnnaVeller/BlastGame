import {EVENTS, GAME_SETTINGS} from '../config'
import Buster from './Buster'

export default class BombBuster extends Buster {
  constructor(config) {
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: 'Бомбы',
      maxValue: GAME_SETTINGS.bombs,
      action: EVENTS.pressBomb
    }, config)
  }

}


