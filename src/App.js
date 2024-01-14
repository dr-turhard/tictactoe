import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
  const className = `square ${isWinningSquare ? 'winning-square' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "0";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner: " + (xIsNext ? "O" : "X");
  } else {
    status = "Next player: " + (xIsNext ? "X" : "0");
  }

  const winningLine = calculateWinner(squares);
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningLine && winningLine.includes(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningLine && winningLine.includes(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningLine && winningLine.includes(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningLine && winningLine.includes(3)} />
      </div>
      <div className="board-row">
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningLine && winningLine.includes(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningLine && winningLine.includes(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningLine && winningLine.includes(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningLine && winningLine.includes(7)} />
      </div>
      <div className="board-row">
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningLine && winningLine.includes(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} isWinningSquare={winningLine && winningLine.includes(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} isWinningSquare={winningLine && winningLine.includes(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} isWinningSquare={winningLine && winningLine.includes(11)} />
      </div>
      <div className="board-row">
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} isWinningSquare={winningLine && winningLine.includes(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} isWinningSquare={winningLine && winningLine.includes(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} isWinningSquare={winningLine && winningLine.includes(14)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} isWinningSquare={winningLine && winningLine.includes(15)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(16).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const size = 4; //Because board size is 4 x 4
  let line;

  //Checking rows
  for(let i = 0; i < size; i++){
    line = [];
    for(let j=0; j < size; j++){
      line.push(i * size + j);
      if(!squares[i * size + j] || squares[i * size + j] !== squares[i * size]){
        line = [];
        break;
      }
    }
    //Returns (winning) line if it has been found
    if(line.length) return line;
  }

  //Checking columns
  for(let i = 0; i < size; i++) {
    line = [];
    for (let j = 0; j < size; j++) {
      line.push(j * size + i);
      if (!squares[j * size + i] || squares[j * size + i] !== squares[i]){
        line= [];
        break;
      }
    }
    if(line.length) return line;
  }

  //Checking main diagonal
  line = [];
  for (let i = 0; i < size; i++) {
    line.push(i * size + i);
    if (!squares[i * size + i] || squares[i * size + i] !== squares[0]) {
      line = [];
      break;
    }
  }
  if (line.length) return line;

  //Checking anti diagonal
  line = [];
  for (let i = 0; i < size; i++) {
    line.push(i * size + (size - 1 - i));
    if (!squares[i * size + (size - 1 - i)] || squares[i * size + (size - 1 - i)] !== squares[size - 1]) {
      line = [];
      break;
    }
  }
  if (line.length) return line;

  //If no winner has been found returns nothing
  return null;
}
