import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash" // Import the entire lodash library

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.2 }) {
  const [board, setBoard] = useState(createBoard());
  // const [board, setBoard] = useState(createWinnableBoard());
  hasWon()

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x < nrows; x++) {
      const row = []
      for (let y = 0; y < ncols; y++) {
        // cell will be true if 'lit'
        const cellValue = (Math.random() < chanceLightStartsOn ? true : false)
        row.push(cellValue)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  /** Uses flipcell() to create winnable board */
  // function createWinnableBoard() {
  //   // start with unlit board, randomly flip 20 cells

  //   const initialBoard = [];
  //   // TODO: create array-of-arrays of true/false values
  //   for (let x = 0; x < nrows; x++) {
  //     const row = []
  //     for (let y = 0; y < ncols; y++) {
  //       // cell will be true if 'lit'
  //       row.push(false)
  //     }
  //     initialBoard.push(row)
  //   }

  //   for (let i = 0; i < 1; i++) {
  //     const x = Math.floor(Math.random() * nrows)
  //     const y = Math.floor(Math.random() * ncols)
  //     flipCell(y, x, initialBoard)
  //     flipCell(y + 1, x, initialBoard)
  //     flipCell(y - 1, x, initialBoard)
  //     flipCell(y, x + 1, initialBoard)
  //     flipCell(y, x - 1, initialBoard)
  //   }

  //   return initialBoard;
  // }

  /** Checks if there are any lit/true cells in the board */

  function hasWon() {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === true) return
      }
    }
    handleVictory()
  }

  function handleVictory() {
    const game = document.querySelector('#game')
    game.remove()
    const victoryText = document.createElement('p')
    victoryText.innerText = 'You win!'
    victoryText.style.fontSize = '20px'
    victoryText.style.textAlign = 'center'
    document.body.append(victoryText)
  }

  // how is coord getting passed in when cell doesn't have that data
  // and isn't passed into function when invoked?
  function flipCell(y, x, boardCopy) {
    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      boardCopy[y][x] = !boardCopy[y][x];
      // true -> false and vice-versa
    }
  };

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

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // Cell returns a <td>

  const tblBoard = [];
  for (let y = 0; y < nrows; y++) {
    const row = [];
    for (let x = 0; x < nrows; x++) {
      const coord = `${y}-${x}`;
      row.push(<Cell key={coord}
        coord={coord}
        isLit={board[y][x]}
        flipCellsAroundMe={() => flipCellsAround(coord)} />)
    }
    tblBoard.push(<tr>{row}</tr>);
  }


  return (
    <>
      <h1>Lights Out!</h1>
      <table data-testid="testGame" id="game" className="GameBoard">
        <tbody>{tblBoard}</tbody>
      </table>
    </>
  )
}

export default Board;
