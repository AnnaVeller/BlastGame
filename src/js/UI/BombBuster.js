import {EVENTS} from '../config'
import Buster from './Buster'

export default class BombBuster extends Buster {
  constructor(config) {
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: 'Бомбы',
      maxValue: 0,
      action: EVENTS.pressBomb
    }, config)
  }

}


