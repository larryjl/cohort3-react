import React from 'react';
import './Game.css';
import { ReactComponent as IconX } from '../svg/Icon_close_circle.svg';
import { ReactComponent as IconO } from '../svg/Icon_record.svg';

// // Square

// // old class
// class Square extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   };

// // new function with only props, no state (state controlled by Board)
function Square(props) {
  let token;
  switch (props.value) {
    case 'X':
    token = <IconX className={
      "token" + ((props.winSquare)
        ? " token--win"
        : "")}/>;
      break; 
    case 'O':
    token = <IconO className={
      "token" + ((props.winSquare)
        ? " token--win"
        : "")}/>;
      break;
    default:
  }
  return (
    <button // 1. built-in DOM has onClick prop, to set up listener
      // className="square"
      className={"square" + ((props.winSquare)?" square--win":"")}
      // // 2. onClick event handler calls 3. this.props.onClick set by 4. board
      onClick={props.onClick}
    >
      {token}
    </button>
  );
};

// // Board
class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square 
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winSquare={(this.props.winLine.indexOf(i)>-1)}
      />
    );
  }

  render() {
    let grid = []
    for (let i = 0; i < 3; i++) {
      let squareButtons = [];
      for (let k = 0; k < 3; k++) {
        squareButtons.push(
          this.renderSquare(i*3+k)
        )
      };
      grid.push(<div key={i} className="board-row">{squareButtons}</div>)
    };
    return (
      <div>
        {grid}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
};

// // Game
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) { // 4. method passed to Square
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // copy of array
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    };
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const moveInfo = {player: squares[i], square: i};
    this.setState({
      history: history.concat([{ // concat creates new array
        squares: squares,
        moveInfo: moveInfo
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext // flip true/false
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    // const currentMoveInfo = current.moveInfo
    const {winner, winLine} = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}: ${step.moveInfo.player} at ${step.moveInfo.square}` :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if (winner === 'draw') {
      status = 'Draw';
    } else if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <main id="idMainGame">
        <h2>Tic-Tac-Toe</h2>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winLine={winLine}
            />
            <div className={(winner)?"status--over":""}>{status}</div>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </main>
    );
  };
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], winLine: lines[i]};
    }
  }
  
  return (squares.filter(e => e === null).length === 0) 
    ? {winner:'draw', winLine: []}
    : {winner: null, winLine: []};
};

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );


export default Game;

