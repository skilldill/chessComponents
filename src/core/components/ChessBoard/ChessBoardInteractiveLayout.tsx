import { FC, useMemo } from "react";
import { getFigureCSS, getFilledArrayBySize } from "../../../utils/figures.utils";
import styles from './ChessBoard.module.css';
import cn from 'classnames';
import { Figure } from "../../../core/JSChessEngine";
import { DEFAULT_CELL_SIZE } from "./constants";

const BASE_BOARD_SIZE = 8

type ChessBoardInteractiveLayoutProps = {
    size?: number;
    selectedPos: number[];
    holdedFigure?: Figure;
    grabbingPos: number[];
}

export const ChessBoardInteractiveLayout: FC<ChessBoardInteractiveLayoutProps> = (props) => {
    const { 
        size = BASE_BOARD_SIZE,
        selectedPos,
        holdedFigure,
        grabbingPos,
    } = props;

    // Эта проверка убирает мерациния фигуры из точки -1 -1
    // в самом начале захвата фигуры
    const isCanShowFigure =
        holdedFigure  
        && grabbingPos[0] > -1 
        && grabbingPos[1] > -1;

    return (
        <div className={styles.interactiveLayout}>
            {getFilledArrayBySize(size).map((_, j) => 
                <div className={styles.row} key={`interactive-layout-${j}`}>
                    {getFilledArrayBySize(size).map((_, i) => (
                        <div 
                            className={cn(styles.interactiveCell, { 
                                [styles.selectedCell]: selectedPos[0] === i && selectedPos[1] === j,
                            })}
                            key={`interactive-layout-${i}`}
                        ></div>
                    ))}
                </div>
            )}
            {isCanShowFigure && (
                <div 
                    className={cn([
                        styles.figure,
                        styles.holdedFigure, 
                        getFigureCSS(holdedFigure),
                    ])}
                    style={{ 
                        top: `${grabbingPos[1] - DEFAULT_CELL_SIZE / 2}px`,
                        left: `${grabbingPos[0] - DEFAULT_CELL_SIZE / 2}px`  
                    }}
                />
            )}
        </div>
    )
}