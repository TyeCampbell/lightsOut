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
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    
    // creates an array-of-arrays of true/false values

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
    
    console.log(board[x][y]);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
        console.log(board[x][y])
      }
    }
    
    // TODO: flip this cell and the cells around it
    
    // Flip cell clicked on
    flipCell(x, y);
    
    // Flip cell North
    flipCell(x+1, y)
    // Flip cell South
    flipCell(x-1, y)
    // Flip cell East
    flipCell(x, y+1)
    // Flip cell West
    flipCell(x, y-1)


    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({
      board: board, 
      hasWon: false,
    });
    
   }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // creates the table board

    let tableBoard = []; 

    for (let x = 0; x < this.props.nrows; x++){
      let createRow = []; 
      for (let y = 0; y < this.props.ncols; y++){
        createRow.push(<Cell key={x + "-" + y} coord={x + "-" + y} flipCellsAround={this.flipCellsAround} isLit={this.state.board[x][y]}/>)
      }
      tableBoard.push(<tr>{createRow}</tr>)
    }

    const showBoard = tableBoard.map(component => component)

    return (
      
      <div>
        <h1>Lights Out</h1>
        <table className="Board">
          <tbody>
            {showBoard}
          </tbody>
        </table>
      </div>

    )
  }
}


export default Board;
