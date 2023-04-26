/** дефолтные настройки поля:
 * если в конфиге уровня нет поля -> берется отсюда
 * если закончились уровни -> будут браться отсюда
 */
export const GAME_SETTINGS = {
  rows: 7,
  cols: 7,
  minCells: 2, // минимальное кол-во клеток для удаления
  colors: ['red', 'yellow', 'green'],
  points: 333, // кол-во очков
  moves: 55, // кол-во ходов
  shuffles: 30, // кол-во перемешиваний
  bombs: 15, // кол-во бомб
  teleports: 11, // кол-во телепортов
  bombR: 3, // радиус сжигания тайлов от бустера бомбы
  bombBlockCount: 8, // столько блоков нужно чтобы образовалась бомба
  bombBlockR: 4, // радиус поражения этот бомбы
  rocketBlockCount: 5, // столько блоков нужно чтобы образовалась ракета
}

/** Уровни */
export const LEVELS = {
  1: {
    rows: 5,
    cols: 6,
    colors: ['green', 'red', 'yellow'],
    points: 56,
    moves: 15,
    shuffles: 10,
    bombs: 2,
    teleports: 6,
    bombBlockR: 3,
  },

  2: {
    rows: 8,
    cols: 8,
    colors: ['green', 'red', 'yellow', 'blue'],
    points: 555,
    moves: 88,
    shuffles: 10,
    bombs: 3,
    teleports: 7,
  },

  3: {
    rows: 7,
    cols: 3,
    colors: ['green', 'yellow'],
    points: 100,
    moves: 15,
    shuffles: 6,
    bombs: 0,
    teleports: 2,
  },

  4: {
    rows: 11,
    cols: 11,
    colors: ['green', 'red', 'yellow', 'blue'],
    points: 999,
    moves: 99,
    shuffles: 30,
    bombs: 7,
    teleports: 5,
  },

  5: {
    rows: 5,
    cols: 6,
    colors: ['blue', 'purple'],
    points: 56,
    moves: 12,
    shuffles: 10,
    bombs: 2,
    teleports: 1,
  },

  6: {
    rows: 15,
    cols: 15,
    colors: ['green', 'red', 'yellow', 'blue', 'purple'],
    points: 567,
    moves: 65,
    shuffles: 30,
    bombs: 4,
    teleports: 5,
    bombBlockR: 6,
    bombR: 6,
    bombBlockCount: 6,
    rocketBlockCount: 4,
  },
}

export const START_LEVEL = 1
