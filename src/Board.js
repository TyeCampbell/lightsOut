import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';
import { create } from "domain";
import { randomBool } from "./Helpers";


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {

  static defaultProps = {
    nrows: 5, 
    ncols: 5, 
    chanceLightStartsOn: randomBool(),
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(), 
      hasWon: false,
    }

    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  
  // creates a random array-of-arrays of true/false values
  createBoard() {
  
    let board = [];

    for (let x = 0; x < this.props.nrows; x++){
      let allRows = []
      for (let y = 0; y < this.props.ncols; y++) {
        allRows.push(randomBool());     
      }
      board.push(allRows);
    }
            
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    
    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    
    // Flip cell Clicked
    flipCell(x, y);
    // Flip cell North
    flipCell(x+1, y)
    // Flip cell South
    flipCell(x-1, y)
    // Flip cell East
    flipCell(x, y+1)
    // Flip cell West
    flipCell(x, y-1)


    // Checks if all cells are false, sets hasWon state to true when every cell is turned off

    let updateWonStatus = false 

    if (board.flat().find(cellStatus => cellStatus === true) === undefined) {
      updateWonStatus = true;
    }

    this.setState({
      board: board, 
      hasWon: updateWonStatus,
    });

   }

   resetGame() {
    this.setState({
      board: this.createBoard(), 
      hasWon: false,
    })
   }

  /** Render game board or winning message. */

  render() {
    
    // creates the table board
    
    let tableBoard = []; 
    
    for (let x = 0; x < this.props.nrows; x++){
      let createRow = []; 
      for (let y = 0; y < this.props.ncols; y++){
        createRow.push(<Cell key={x + "-" + y} coord={x + "-" + y} flipCellsAround={this.flipCellsAround} isLit={this.state.board[x][y]}/>)
      }
      tableBoard.push(<tr key={x} >{createRow}</tr>)
    }
    
    // if the game is won, show a winning msg & render nothing else
    let gameState; 

    if (this.state.hasWon === false) {
      
      gameState = 
      
      <div className='board-table'>
        <table className='Board'>
          <tbody>
            {tableBoard}
          </tbody>
        </table>
      </div>      

    }

    if (this.state.hasWon === true) {

      gameState = 

        <div className='board-winner'> 
          <h1>You win!</h1>
          <button className='board-resetBtn' onClick={this.resetGame} >Start New Game</button>
        </div>

    }

    return (
      
      <div>
        <h1 className='board-title'><span className='board-title-accent'>Lights</span> Out</h1>
        {gameState}
      </div>

    )
  }
}


export default Board;
