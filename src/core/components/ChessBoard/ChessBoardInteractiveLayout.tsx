import { FC } from "react";
import { checkIsPossibleMove, getFigureCSS, getFilledArrayBySize } from "./utils";
import styles from './ChessBoard.module.css';
import cn from 'classnames';
import { Figure } from "../../../core/JSChessEngine";
import { HoldedFigure } from "./HoldedFigure";

const BASE_BOARD_SIZE = 8

type ChessBoardInteractiveLayoutProps = {
    size?: number;
    selectedPos: number[];
    possibleMoves: number[][];
    holdedFigure?: Figure;
    grabbingPos: number[];
}

export const ChessBoardInteractiveLayout: FC<ChessBoardInteractiveLayoutProps> = (props) => {
    const { 
        size = BASE_BOARD_SIZE,
        selectedPos,
        possibleMoves,
        holdedFigure,
        grabbingPos,
    } = props;

    return (
        <>
            <HoldedFigure 
                holdedFigure={holdedFigure}
                grabbingPos={grabbingPos}
            />
            <div className={styles.interactiveLayout}>
                {getFilledArrayBySize(size).map((_, j) => 
                    <div className={styles.row} key={`interactive-layout-${j}`}>
                        {getFilledArrayBySize(size).map((_, i) => (
                            <div 
                                className={cn(styles.interactiveCell, { 
                                    [styles.selectedCell]: selectedPos[0] === i && selectedPos[1] === j,
                                })}
                                key={`interactive-layout-${i}`}
                            >
                                {selectedPos[0] === i && selectedPos[1] === j && holdedFigure && (
                                    <div 
                                        className={cn([
                                            styles.figure,
                                            styles.holdedFigure,
                                            getFigureCSS(holdedFigure),
                                        ], {
                                            [styles.bluredFigure]: grabbingPos[0] !== -1,
                                        })}
                                    />
                                )}
                                {checkIsPossibleMove(possibleMoves, [i, j]) && (
                                    <div className={styles.possibleMoveMark} />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}