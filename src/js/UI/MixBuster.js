import {EVENTS, GAME_SETTINGS} from '../config'
import Buster from './Buster'

export default class MixBuster extends Buster {
  constructor(config) {
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: 'Перемешать',
      maxValue: GAME_SETTINGS.shuffles,
      action: EVENTS.pressShuffle
    }, config)
  }

}


