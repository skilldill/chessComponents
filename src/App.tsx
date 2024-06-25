import { useState } from 'react'
import { ChessBoard } from './core/components'
import { ChessBoardConfig } from 'core/components/ChessBoard/models';
import { CHESS_PIECES_MAP } from './core/components/ChessBoard/chessPieciesMap';

// r6r/8/8/8/8/8/8/R6R w KQkq - 0 1
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
//https://pics.clipartpng.com/midle/Pawn_White_Chess_Piece_PNG_Clip_Art-2751.png

const CONFIG: Partial<ChessBoardConfig> = { 
  cellSize: 60,
  selectedCellColor: 'gray',
  selectedCellBorder: '4px dashed black',
  circleMarkColor: 'red',
  whiteCellColor: '#166',
  blackCellColor: '#e0e0e0',
  arrowColor: 'red',
  markedCellColor: 'red',
  checkedCellColor: 'green',
  piecesMap: {
    ...CHESS_PIECES_MAP,
    'pawn-white': (size) => <img width={size} height={size} src="https://pics.clipartpng.com/midle/Pawn_White_Chess_Piece_PNG_Clip_Art-2751.png" />,
  }
}

function App() {
  const [reversed, setReversed] = useState(false);
  return (
    <div style={{ height: 3000, display: 'flex', justifyContent: 'center' }}>
      <ChessBoard 
        // FEN="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
        FEN="q6k/8/8/8/8/8/8/3NKR2 w - - 0 1"
        // FEN="2K5/q7/8/8/8/8/8/7r b - - 0 1"
        onChange={(data) => { console.log(data) }}
        onEndGame={(data) => { console.log(data) }}
        reversed={reversed}
        // config={CONFIG}
      />
      {/* <button
        onClick={() => setReversed((prev) => !prev)}
      >revese</button> */}
    </div>
  )
}

export default App
