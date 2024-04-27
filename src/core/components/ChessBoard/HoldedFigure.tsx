import { Figure } from "../../../core/JSChessEngine";
import { FC } from "react";
import styles from './ChessBoard.module.css';
import { getFigureCSS } from "../../../utils/figures.utils";
import cn from 'classnames';
import { DEFAULT_CELL_SIZE } from "./constants";

type HoldedFigureProps = {
    holdedFigure?: Figure;
    grabbingPos: number[];
}

export const HoldedFigure: FC<HoldedFigureProps> = (props) => {
    const { holdedFigure, grabbingPos } = props;

    // Эта проверка убирает мерациния фигуры из точки -1 -1
    // в самом начале захвата фигуры
    const isCanShowFigure =
        holdedFigure  
        && grabbingPos[0] > -1 
        && grabbingPos[1] > -1;

    return isCanShowFigure && (
        <div 
            className={cn([
                styles.figure,
                styles.holdedFigure, 
                getFigureCSS(holdedFigure),
            ])}
            style={{ 
                position: 'fixed',
                zIndex: 6,
                top: `${grabbingPos[1] - DEFAULT_CELL_SIZE / 2}px`,
                left: `${grabbingPos[0] - DEFAULT_CELL_SIZE / 2}px`  
            }}
        />
    );
} 