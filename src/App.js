import { useState } from 'react'

function Square({ square, handleSquareOnClick }) { // props.number
  return (
    <button 
        className="h-[60px] border border-lime"
        onClick={handleSquareOnClick}
      >
          {square}
      </button>
  )
}

function checkWinner(sq) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[b] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(''))
  const [isX, setIsX] = useState(true);
  // ['', '', '', 
  //  '', '', '', 
  //  '', '', '']
  function handleAppOnClick(index) {
    // squares[index] = 'X' 
    if (!squares[index] && !checkWinner(squares)) {
      const newSquares = squares.slice(); // copy a new array 
      newSquares[index] = isX ? 'X' : 'O'; // newSqures[0] = 'X'
      // newSquares => 
      // ['X', '', '', 
      //  '', '', '', 
      //  '', '', '']
      setSquares(newSquares)
      setIsX(!isX)
    }

  }
  const winner = checkWinner(squares); // 'X' / 'O' / null
  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next player is ${isX ? 'X' : 'O'}`;
  }

  return ( // JSX
    <>
    <div className="grid grid-cols-3 w-[180px] mt-4 ml-4">
      {
        Array(9).fill(0).map((item, index) => { // [0, 0, 0, 0, 0, 0, 0, 0, 0]
          return (<Square 
              key={index}
              square={squares[index]}
              handleSquareOnClick={() => handleAppOnClick(index)}
            />)
        })
      }
    </div>
    <div>
      {status}
    </div>
    </>
  );
}

export default App;
