import { useState } from 'react'
import { ChessBoard } from './core/components'
import { MoveData } from 'core/JSChessEngine';

// r6r/8/8/8/8/8/8/R6R w KQkq - 0 1
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
function App() {
  const [reversed, setReversed] = useState(false);
  return (
    <>
      <ChessBoard 
        FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        onChange={(data) => { console.log(data) }}
        color="white"
        reversed={reversed}
      />
      <button
        onClick={() => setReversed((prev) => !prev)}
      >revese</button>
    </>
  )
}

export default App
