import { FENtoGameState, FigureColor, MoveData } from "../../../core/JSChessEngine";
import { FC, useEffect } from "react";
import styles from './ChessBoard.module.css';
import { ChessBoardCellsLayout } from "./ChessBoardCellsLayout";
import { ChessBoardFiguresLayout } from "./ChessBoardFiguresLayout";
import { ChessBoardControlLayout } from "./ChessBoardControlLayout";
import { useChessBoardInteractive } from "./useChessBoardInteractive";
import { ChessBoardInteractiveLayout } from "./ChessBoardInteractiveLayout";
import { ChangeMove } from "./models";
import { ArrowLayout } from "./ArrowLayout";

type ChessBoardProps = {
    FEN: string;
    onChange: (moveData: MoveData) => void;
    color: FigureColor;
    change?: ChangeMove;
    reversed?: boolean;
}

export const ChessBoard: FC<ChessBoardProps> = (props) => {
    const { FEN, onChange, change, reversed } = props;

    const {
        initialState,
        fromPos,
        holdedFigure,
        grabbingPos,
        possibleMoves,
        newMove,
        markedCells,
        arrowsCoords,
        startArrowCoord,

        setActualState,
        selectClickFrom,
        startRenderArrow,
        selectHoverFrom,
        handleGrabbing,
        handleGrabEnd,
        handleClick,
        setInitialState,
        setCurrentColor,
        reverseChessBoard,
        setNewMove,
        markCell,
        getHasCheckByCellPos,
        endRenderArrow,
    } = useChessBoardInteractive({ onChange });

    useEffect(() => {
        const { boardState, currentColor } = FENtoGameState(FEN);
        setInitialState(boardState);
        setActualState(boardState);
        setCurrentColor(currentColor);
    }, [FEN]);

    useEffect(() => {
        if (reversed) reverseChessBoard();
    }, [reversed]);

    useEffect(() => {
        setNewMove(change);
    }, [change]);

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
                markedCells={markedCells}
                onHasCheck={getHasCheckByCellPos}
            />
            <ArrowLayout 
                arrowsCoords={arrowsCoords}
                startArrowCoord={startArrowCoord}
                grabbingPos={grabbingPos}
            />
            <ChessBoardControlLayout
                onClick={handleClick}
                onGrabStart={selectHoverFrom}
                onGrabStartRight={startRenderArrow}
                onGrabEnd={handleGrabEnd}
                onGrabEndRight={endRenderArrow}
                onGrabbing={handleGrabbing}
                onRightClick={markCell}
            />
        </div>
    )
}