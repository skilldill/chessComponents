import { Cell, Figure, MoveData } from "../../../core/JSChessEngine";
import { FC, useEffect, useState } from "react";
import styles from './ChessBoard.module.css';
import cn from 'classnames';
import { getFigureCSS, mapCellsToFiguresArray } from "../../../utils/figures.utils";
import { DEFAULT_CELL_SIZE } from "./constants";

type ChessBoardFiguresLayoutProps = {
    initialState: Cell[][];
    change?: MoveData[];
    blurPosition?: number[];
}

export const ChessBoardFiguresLayout: FC<ChessBoardFiguresLayoutProps> = (props) => {
    const { initialState, change, blurPosition } = props;
    const [actualState, setActualState] = useState<Figure[]>([]);

    useEffect(() => {
        setActualState(mapCellsToFiguresArray(initialState));
    }, [initialState])

    useEffect(() => {
        if (!!change) {
            setActualState((prevState) => {
                const updatedState = [...prevState];

                change.forEach((moveData) => {
                    const foundFigureByPosition = updatedState.find((figure) => 
                        figure.position![0] === moveData.from[0]
                        && figure.position![1] === moveData.from[1]
                    );

                    foundFigureByPosition!.position! = moveData.to; 
                });

                return updatedState;
            });
        }
    }, [change])


    return (
        <div className={styles.figuresLayout}>
            {actualState.map((figure, i) => 
                <div 
                    key={i}
                    className={cn(
                        [styles.figure, getFigureCSS(figure)],
                        { 
                            [styles.bluredFigure]: 
                                !!blurPosition
                                && figure.position![0] === blurPosition[0]
                                && figure.position![1] === blurPosition[1]
                        }
                    )}
                    style={{ 
                        top: `${DEFAULT_CELL_SIZE * figure.position![1]}px`, 
                        left: `${DEFAULT_CELL_SIZE * figure.position![0]}px`
                    }}
                />
            )}
        </div>
    )
}