export const IS_EXPORT_FIELD = true

export const GAME_SETTINGS = {
  rows: 6,
  cols: 6,
  size: 171,
  minCells: 2, // минимальное кол-во клеток для удаления
  availableColors: ['blue', 'green', 'purple', 'red', 'yellow'],
  colors: ['green', 'red', 'yellow', 'blue'],
  shuffles: 30, // кол-во перемешиваний
  points: 555, // кол-во очков
  moves: 50, // кол-во ходов
  bombs: 3, // кол-во бомб
  bombR: 3, // радиус сжигания тайлов от бомбы
  teleports: 7,
  superBlockCount: 8, // столько блоков нужно чтобы образовался супер блок
  superBlockR: 4,
  rocketBlockCount: 5, // столько блоков нужно чтобы образовалась ракета
}

export const TIME = {
  shuffle: 500,
  teleport: 300,
  explosion: 300,
  fallDelay: 400, // задержка опадения фишек после взрыва
  fallOneCell: 120, // падение блока на одну ячейку
  delayFall: 50, // задержка одного блока при падении
  spawn: 300,
  delete: 200,
}

export const GAME_LEVEL = [
  ['yellow', 'yellow', 'blue', 'blue', 'blue', 'blue', 'yellow', 'yellow'],
  ['yellow', 0, 'blue', 'blue', 'blue', 'blue', 0, 'yellow'],
  ['yellow', 0, 'yellow', 'yellow', 'yellow', 'yellow', 0, 'yellow'],
  [0, 0, 'yellow', 'red', 'red', 'yellow', 0, 0],
  [0, 0, 'yellow', 'red', 'red', 'yellow', 0, 0],
  [0, 0, 'yellow', 'yellow', 'yellow', 'yellow', 0, 0],
  [0, 0, 'blue', 'blue', 'blue', 'blue', 0, 0],
  ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
]


if (IS_EXPORT_FIELD) {
  GAME_SETTINGS.rows = GAME_LEVEL.length
  GAME_SETTINGS.cols = GAME_LEVEL[0].length
}

export const EVENTS = {
  blockTap: 'blockTap',
  endAction: 'endAction',
  pressShuffle: 'pressShuffle',
  pressBomb: 'pressBomb',
  pressTeleport: 'pressTeleport'
}

export const RESOURCES = [
  {
    key: 'empty',
    type: 'image',
    url: require('../assets/empty.png'),
  },
  {
    key: 'blue',
    type: 'image',
    url: require('../assets/blue.png'),
  },
  {
    key: 'green',
    type: 'image',
    url: require('../assets/green.png'),
  },
  {
    key: 'purple',
    type: 'image',
    url: require('../assets/purple.png'),
  },
  {
    key: 'red',
    type: 'image',
    url: require('../assets/red.png'),
  },
  {
    key: 'yellow',
    type: 'image',
    url: require('../assets/yellow.png'),
  },
  {
    key: 'label',
    type: 'image',
    url: require('../assets/label.png'),
  },
  {
    key: 'button',
    type: 'image',
    url: require('../assets/button.png'),
  },
  {
    key: 'panel',
    type: 'image',
    url: require('../assets/panel.png'),
  },
  {
    key: 'bg',
    type: 'image',
    url: require('../assets/bg.jpg'),
  },
  {
    key: 'btnStroke',
    type: 'image',
    url: require('../assets/button_stroke.png'),
  },
  {
    key: 'stroke',
    type: 'image',
    url: require('../assets/stroke_red.png'),
  },
  {
    key: 'superBlock',
    type: 'image',
    url: require('../assets/super_block.png'),
  },
  {
    key: 'bomb',
    type: 'image',
    url: require('../assets/bomb.png'),
  },
  {
    key: 'rocket',
    type: 'image',
    url: require('../assets/rocket.png'),
  },
  {
    key: 'explosion',
    type: 'image',
    url: require('../assets/explosion.png'),
  },
  {
    key: 'explosionSpritesheet',
    type: 'spritesheet',
    url: require('../assets/explosionSpritesheet.png'),
    config: {frameWidth: 256, frameHeight: 256}
  },
  {
    key: 'marvin',
    type: 'font',
    url: {
      png: require('../assets/Marvin/marvin.png'),
      xml: require('../assets/Marvin/marvin.xml'),
    },
  },

]
