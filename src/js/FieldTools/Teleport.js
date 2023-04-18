export default class Teleport {

  static teleportBlocks(block1, block2, allBlocks) {
    const tmpI = block2.i
    const tmpJ = block2.j

    block2.i = block1.i
    block2.j = block1.j

    block1.i = tmpI
    block1.j = tmpJ

    allBlocks[block1.i][block1.j] = block1
    allBlocks[block2.i][block2.j] = block2
  }
}
