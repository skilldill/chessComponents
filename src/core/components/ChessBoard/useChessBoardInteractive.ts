import { Cell, Figure } from "../../../core/JSChessEngine";
import { useState } from "react"

export const useChessBoardInteractive = () => {
    const [actualState, setActualState] = useState<Cell[][]>([]);
    const [fromPos, setFromPos] = useState<number[]>([-1, -1]);
    const [holdedFigure, setHoldedFigure] = useState<Figure>();
    const [grabbingPos, setGrabbingPos] = useState<number[]>([-1, -1]);

    const clearFromPos = () => setFromPos([-1, -1]);

    const selectFrom = (cellPos: number[]) => {
        const cell = actualState[cellPos[1]][cellPos[0]];

        if (!cell.figure) {
            clearFromPos();
            return;
        }

        setHoldedFigure(cell.figure);
        setFromPos(cellPos);
    }

    const handleGrabStart = (cellPos: number[]) => {

    }

    const handleGrabbing = (x: number, y: number) => {   
        setGrabbingPos([x, y]);
    }

    const handleGrabEnd = (cellPos: number[]) => {
        setHoldedFigure(undefined);
        setGrabbingPos([-1, -1]);
    }

    return {
        fromPos,
        actualState,
        holdedFigure,
        grabbingPos,

        setActualState,
        selectFrom,
        clearFromPos,
        handleGrabStart,
        handleGrabbing,
        handleGrabEnd,
    }
}