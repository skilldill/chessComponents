import { Cell, Figure, JSChessEngine } from "../../../core/JSChessEngine";
import { useState } from "react"

export const useChessBoardInteractive = () => {
    const [actualState, setActualState] = useState<Cell[][]>([]);
    const [fromPos, setFromPos] = useState<number[]>([-1, -1]);
    const [holdedFigure, setHoldedFigure] = useState<Figure>();
    const [grabbingPos, setGrabbingPos] = useState<number[]>([-1, -1]);
    const [possibleMoves, setPossibleMoves] = useState<number[][]>([]);

    const clearFromPos = () => setFromPos([-1, -1]);
    const clearGrabbingPos = () => setGrabbingPos([-1, -1]);
    const clearPossibleMoves = () => setPossibleMoves([]);

    const selectFrom = (cellPos: number[]) => {
        const cell = actualState[cellPos[1]][cellPos[0]];

        if (!cell.figure) {
            clearFromPos();
            clearPossibleMoves();
            return;
        }

        const nextMoves = JSChessEngine.getNextMoves(
            actualState,
            cellPos,
            [], // TODO: добавить линии с шахом
            false // Добавить определение reverse
        );

        setPossibleMoves(nextMoves);

        setHoldedFigure(cell.figure);
        setFromPos(cellPos);
    }

    const handleGrabStart = (cellPos: number[]) => {
        
    }

    const handleGrabbing = (x: number, y: number) => {   
        setGrabbingPos([x, y]);
    }

    const handleGrabEnd = (cellPos: number[]) => {
        clearGrabbingPos();
    }

    

    return {
        fromPos,
        actualState,
        holdedFigure,
        grabbingPos,
        possibleMoves,

        setActualState,
        selectFrom,
        clearFromPos,
        handleGrabStart,
        handleGrabbing,
        handleGrabEnd,
    }
}