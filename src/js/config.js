export const IS_EXPORT_FIELD = true

export const GAME_SETTINGS = {
  rows: 8,
  cols: 8,
  size: 171,
  minCells: 2, // минимальное кол-во клеток для удаления
  availableColors: ['blue', 'green', 'purple', 'red', 'yellow'],
  colors: ['green', 'red', 'yellow', 'blue'],
  shuffles: 30, // кол-во перемешиваний
  points: 555, // кол-во очков
  moves: 77, // кол-во ходов
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
  pressTeleport: 'pressTeleport',
  soundOn: 'soundOn',
  soundOff: 'soundOff',
}

export const SOUNDS = {
  win: 'win',
  start: 'start',
  error: 'error',
  explosion: 'explosion',
  fail: 'fail',
  shuffle: 'shuffle',
  buttonClick: 'buttonClick',
  move: 'move',
  tap: 'tap',
  click: 'click',
}

export const RESOURCES = [
  {
    key: 'bg',
    type: 'image',
    url: './assets/images/bg.jpg',
  },
  {
    key: 'blocks',
    type: 'atlas',
    url: './assets/images/blocks.png',
    json: './assets/images/blocks.json',
  },
  {
    key: 'ui',
    type: 'atlas',
    url: './assets/images/ui.png',
    json: './assets/images/ui.json',
  },
  {
    key: 'explosionSpritesheet',
    type: 'spritesheet',
    url: './assets/images/explosionSpritesheet.png',
    config: {frameWidth: 256, frameHeight: 256}
  },
  {
    key: 'marvin',
    type: 'font',
    url: './assets/fonts/Marvin/marvin.png',
    xml: './assets/fonts/Marvin/marvin.xml',
  },
  {
    key: SOUNDS.tap,
    type: 'audio',
    url: './assets/sounds/tap.mp3',
  },
  {
    key: SOUNDS.error,
    type: 'audio',
    url: './assets/sounds/error.mp3',
  },
  {
    key: SOUNDS.explosion,
    type: 'audio',
    url: './assets/sounds/explosion.mp3',
  },
  {
    key: SOUNDS.fail,
    type: 'audio',
    url: './assets/sounds/fail.mp3',
  },
  {
    key: SOUNDS.shuffle,
    type: 'audio',
    url: './assets/sounds/shuffle.mp3',
  },
  {
    key: SOUNDS.buttonClick,
    type: 'audio',
    url: './assets/sounds/buttonClick.mp3',
  },
  {
    key: SOUNDS.win,
    type: 'audio',
    url: './assets/sounds/win.mp3',
  },
  {
    key: SOUNDS.start,
    type: 'audio',
    url: './assets/sounds/start.mp3',
  },
  {
    key: SOUNDS.move,
    type: 'audio',
    url: './assets/sounds/move.mp3',
  },
  {
    key: SOUNDS.click,
    type: 'audio',
    url: './assets/sounds/click.mp3',
  },

]
