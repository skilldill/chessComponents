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
    onChange: (moveData: MoveData) => void;
    color: FigureColor;
    change?: MoveData[];
    reversed?: boolean;
}

export const ChessBoard: FC<ChessBoardProps> = (props) => {
    const { FEN, onChange, change, reversed } = props;

    const {
        initialState,
        actualState,
        fromPos,
        holdedFigure,
        grabbingPos,
        possibleMoves,
        newMove,

        setActualState,
        selectFrom,
        handleGrabbing,
        handleGrabEnd,
        handleClick,
        setInitialState,
        setCurrentColor,
        reverseChessBoard,
    } = useChessBoardInteractive({ onChange });

    useEffect(() => {
        const { boardState, currentColor } = FENtoGameState(FEN);
        setInitialState(boardState);
        setActualState(boardState);
        setCurrentColor(currentColor);
    }, [FEN])

    useEffect(() => {
        if (reversed) reverseChessBoard();
    }, [reversed])

    return (
        <div className={styles.chessBoard}>
            <ChessBoardCellsLayout />
            <ChessBoardFiguresLayout 
                initialState={initialState}
                change={newMove}
                reversed={reversed}
            />
            <ChessBoardInteractiveLayout
                selectedPos={fromPos}
                possibleMoves={possibleMoves}
                holdedFigure={holdedFigure}
                grabbingPos={grabbingPos}
            />
            <ChessBoardControlLayout
                // onClick={() => {}}
                // onGrabStart={selectFrom}
                // onGrabEnd={handleGrabEnd}
                // onGrabbing={handleGrabbing}
                
                onClick={handleClick}
                onGrabStart={() => {}}
                onGrabEnd={() => {}}
                onGrabbing={() => {}}
            />
        </div>
    )
}