import React, { Fragment, useState } from "react";

let hasWon = '';

function Square({ value, handleSquare }) {

  return <button className="square" onClick={handleSquare} >{value}</button>;
}

function Board({ squares, xIsNext, onPlay }) {

  function handleClickedSquare(i) {
    let currentSymbol;
    const secSequare = squares.slice();

    if (squares[i])
      return;

    if (xIsNext)
      currentSymbol = 'x';
    else
      currentSymbol = 'o';

    secSequare[i] = currentSymbol;

    const isWinner = calculateIsWinner(secSequare);

    if (hasWon) {
      alert(hasWon + " is already the winner!!!");
      return;
    }

    if (isWinner) {
      hasWon = currentSymbol;
      alert(hasWon + " is the winner!!!");
    }

    onPlay(secSequare);

  }


  return (
    <Fragment>
      <div className="board-row">
        <Square value={squares[0]} handleSquare={() => handleClickedSquare(0)} />
        <Square value={squares[1]} handleSquare={() => handleClickedSquare(1)} />
        <Square value={squares[2]} handleSquare={() => handleClickedSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleSquare={() => handleClickedSquare(3)} />
        <Square value={squares[4]} handleSquare={() => handleClickedSquare(4)} />
        <Square value={squares[5]} handleSquare={() => handleClickedSquare(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleSquare={() => handleClickedSquare(6)} />
        <Square value={squares[7]} handleSquare={() => handleClickedSquare(7)} />
        <Square value={squares[8]} handleSquare={() => handleClickedSquare(8)} />
      </div>
    </Fragment>
  );
}


export default function Game() {

  const [squaresHistory, setSequaresHistory] = useState([Array(9).fill(null)]);
  const [viewSquareIndex, setViewSquareIndex] = useState(0);

  const currentSquare = squaresHistory[viewSquareIndex];
  const xIsNext = (viewSquareIndex % 2 === 0);

  function handlePlay(secSequare) {

    let index = viewSquareIndex + 1;
    setViewSquareIndex(index);
    setSequaresHistory([...squaresHistory.slice(0,index), secSequare]);
  }

  function jumpTo(nextSquare){
    setViewSquareIndex(nextSquare);  

    hasWon = '';
  }


  const Moves = squaresHistory.map((value, index) => {
    let statement;

    if(index > 0){
      statement = `Back to #${index} step`;
    }
    else{
      statement = 'Back to Start';
    }

    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{statement}</button>
      </li>
    )
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>
          {Moves}
        </ol>
      </div>
    </div>
  );
}

function calculateIsWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }

  return false;
}