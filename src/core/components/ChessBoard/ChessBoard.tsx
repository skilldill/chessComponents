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
    } = useChessBoardInteractive();

    useEffect(() => {
        const positions = FENtoGameState(FEN);
        setInitialState(positions.boardState);
        setActualState(positions.boardState);
    }, [FEN])

    return (
        <div className={styles.chessBoard}>
            <ChessBoardCellsLayout />
            <ChessBoardFiguresLayout 
                initialState={initialState}
                change={newMove}
            />
            <ChessBoardInteractiveLayout 
                selectedPos={fromPos}
                possibleMoves={possibleMoves}
                holdedFigure={holdedFigure}
                grabbingPos={grabbingPos}
            />
            <ChessBoardControlLayout
                onClick={handleClick}
                // onClick={() => {}}
                // onGrabStart={selectFrom}
                // onGrabEnd={handleGrabEnd}
                // onGrabbing={handleGrabbing}
                onGrabStart={() => {}}
                onGrabEnd={() => {}}
                onGrabbing={() => {}}
            />
        </div>
    )
}