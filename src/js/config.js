export const IS_EXPORT_FIELD = true

export const GAME_SETTINGS = {
  rows: 6,
  cols: 6,
  size: 171,
  minCells: 2, // минимальное кол-во клеток для удаления
  availableColors: ['blue', 'green', 'purple', 'red', 'yellow'],
  colors: ['green', 'red', 'yellow', 'blue'],
  shuffles: 3, // кол-во перемешиваний
  points: 99, // кол-во очков
  moves: 5, // кол-во ходов
  bombs: 3, // кол-во бомб
  bombR: 3, // радиус сжигания тайлов от бомбы
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
  pressBomb: 'pressBomb'
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
    key: 'marvin',
    type: 'font',
    url: {
      png: require('../assets/Marvin/marvin.png'),
      xml: require('../assets/Marvin/marvin.xml'),
    },
  },

]
