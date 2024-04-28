import { FENtoGameState, FigureColor, MoveData } from "../../../core/JSChessEngine";
import { FC, useEffect } from "react";
import styles from './ChessBoard.module.css';
import { ChessBoardCellsLayout } from "./ChessBoardCellsLayout";
import { ChessBoardFiguresLayout } from "./ChessBoardFiguresLayout";
import { ChessBoardControlLayout } from "./ChessBoardControlLayout";
import { useChessBoardInteractive } from "./useChessBoardInteractive";
import { ChessBoardInteractiveLayout } from "./ChessBoardInteractiveLayout";

type ChessBoardProps = {
    FEN: string;
    onChange: (FEN: string) => void;
    color: FigureColor;
    change?: MoveData[]
}

export const ChessBoard: FC<ChessBoardProps> = (props) => {
    const { FEN, change } = props;

    const {
        actualState,
        fromPos,
        holdedFigure,
        grabbingPos,
        possibleMoves,

        setActualState,
        selectFrom,
        handleGrabbing,
        handleGrabEnd,
    } = useChessBoardInteractive();

    useEffect(() => {
        const positions = FENtoGameState(FEN);
        setActualState(positions.boardState);
    }, [FEN])

    return (
        <div className={styles.chessBoard}>
            <ChessBoardCellsLayout />
            <ChessBoardFiguresLayout 
                initialState={actualState}
                change={change}
            />
            <ChessBoardInteractiveLayout 
                selectedPos={fromPos}
                possibleMoves={possibleMoves}
                holdedFigure={holdedFigure}
                grabbingPos={grabbingPos}
            />
            <ChessBoardControlLayout
                onSelect={console.log}
                onGrabStart={selectFrom}
                onGrabEnd={handleGrabEnd}
                onGrabbing={handleGrabbing}
            />
        </div>
    )
}