export default class Shuffler {

  static shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5)
  }

  static shuffle(blocksArray) {
    const newBlocks = blocksArray.map((item) => [...item])

    const indexArray = []

    for (let i = 0; i < blocksArray.length; i++) {
      for (let j = 0; j < blocksArray[0].length; j++) {
        indexArray.push([i, j])
      }
    }

    const shuffledArray = this.shuffleArray(indexArray)

    for (let i = 0; i < blocksArray.length; i++) {
      for (let j = 0; j < blocksArray[0].length; j++) {
        const block = blocksArray[i][j]
        const indexes = shuffledArray.pop()
        block.i = indexes[0]
        block.j = indexes[1]
        newBlocks[block.i][block.j] = block
      }
    }

    return newBlocks
  }

}
