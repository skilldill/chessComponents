import { useState } from 'react'
import { ChessBoard } from './core/components'
import { MoveData } from 'core/JSChessEngine';

// r6r/8/8/8/8/8/8/R6R w KQkq - 0 1
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
function App() {
  return (
    <>
      <ChessBoard 
        FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        onChange={(data) => { console.log(data) }}
        color="white"
      />
    </>
  )
}

export default App
