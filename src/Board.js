import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';
import { create } from "domain";


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
    nrows: 10, 
    ncols: 10, 
    chanceLightStartsOn: Math.random() >= 0.5,
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.createBoard = this.createBoard.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];

    // TODO: create array-of-arrays of true/false values
    const nrows = this.props.nrows;

    function genRows(rows) {
      let allRows = [];
      
      for (let row = 0; row < rows; row++) {
        
        allRows = allRows.concat([Math.random() <= 0.5])
  
      }

      return allRows;
    }

       
      
      for (let col = 0; col < this.props.ncols; col++) {
          board = board.concat([genRows(nrows)])
        }
      
    console.log(board);
      

    // return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

  

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

  //   this.setState({board, hasWon});
   }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO

    return (
      
      <div>
        <h1>Lights Out</h1>
        <h2>{this.createBoard()}</h2>
        <table className="Board">
          <tbody>
            <tr>
              <Cell isLit={true}/>
              <Cell isLit={false}/>
              <Cell isLit={false}/>
              <Cell isLit={true}/>
              <Cell isLit={true}/>
            </tr>
          </tbody>

        </table>
      </div>

    )
  }
}


export default Board;
