import _ from "lodash" // Import the entire lodash library

  /** flips cells true->false and vice-versa */
function flipCellsAround(coord) {

    // oldBoard === board
    setBoard(oldBoard => {

        // referencing `x-y` key = {coord}
        const [y, x] = coord.split("-").map(Number);

        // TODO: Make a (deep) copy of the oldBoard
        const newBoard = _.cloneDeep(oldBoard)

        // TODO: in the copy, flip this cell and the cells around it

        flipCell(y, x, newBoard)
        flipCell(y + 1, x, newBoard)
        flipCell(y - 1, x, newBoard)
        flipCell(y, x + 1, newBoard)
        flipCell(y, x - 1, newBoard)

        // TODO: return the copy
        return newBoard
        // need to return new nested-arr so state updates
    });
}

export default flipCellsAround;