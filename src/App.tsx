import { useState } from 'react'
import { ChessBoard } from './core/components'
import { MoveData } from 'core/JSChessEngine';

// r6r/8/8/8/8/8/8/R6R w KQkq - 0 1
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
function App() {
  const [change, setChange] = useState<MoveData[]>();
  return (
    <>
      <ChessBoard 
        FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        onChange={() => {}}
        color="white"
        change={change}
      />

      <div>
        <button onClick={() => setChange([{
          from: [2, 6],
          to: [2, 4],
          figure: {
            type: 'pawn',
            color: 'white',
          }
        }])}>first move</button>
      </div>
    </>
  )
}

export default App
