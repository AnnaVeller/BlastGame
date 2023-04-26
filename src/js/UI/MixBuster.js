import {EVENTS} from '../config'
import Buster from './Buster'

export default class MixBuster extends Buster {
  constructor(config) {
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: 'Перемешать',
      maxValue: 0,
      action: EVENTS.pressShuffle
    }, config)
  }

}


