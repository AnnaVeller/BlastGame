import {EVENTS} from '../config'
import Buster from './Buster'

export default class TeleportBuster extends Buster {
  constructor(config) {
    super(config)
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      name: 'Телепорты',
      maxValue: 0,
      action: EVENTS.pressTeleport,
    }, config)
  }

}


