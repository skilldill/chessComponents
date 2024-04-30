import { Cell, Figure } from "../../../core/JSChessEngine";
import { FC, useEffect, useState } from "react";
import styles from './ChessBoard.module.css';
import cn from 'classnames';
import { getFigureCSS, mapCellsToFiguresArray } from "./utils";
import { DEFAULT_CELL_SIZE } from "./constants";
import { ChangeMove } from "./models";

type ChessBoardFiguresLayoutProps = {
    initialState: Cell[][];
    change?: ChangeMove; // chage is array for correct rndering transitions for castling
    blurPosition?: number[];
}

export const ChessBoardFiguresLayout: FC<ChessBoardFiguresLayoutProps> = (props) => {
    const { initialState, change } = props;
    const [actualState, setActualState] = useState<Figure[]>([]);

    useEffect(() => {
        setActualState(mapCellsToFiguresArray(initialState));
    }, [initialState])

    useEffect(() => {
        if (!!change) {
            setActualState((prevState) => {
                const updatedState = [...prevState];

                // Добавить обработку рокеровок

                change.moves.forEach((moveData) => {
                    const { from, to } = moveData;

                    const foundAttactedFigure = updatedState.find((figure) => 
                        figure.position![0] === to[0]
                        && figure.position![1] === to[1]
                    );

                    if (foundAttactedFigure) {
                        foundAttactedFigure.color === 'white' 
                        ? foundAttactedFigure.position = [8, foundAttactedFigure.position![1]]
                        : foundAttactedFigure.position = [-1, foundAttactedFigure.position![1]]
                    };

                    const foundFigureByPositionFrom = updatedState.find((figure) => 
                        figure.position![0] === from[0]
                        && figure.position![1] === from[1]
                    );

                    foundFigureByPositionFrom!.position! = moveData.to; 
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
                    className={cn([styles.figure, getFigureCSS(figure)], {
                        [styles.hiddenFigure]: figure.position![0] === -1 || figure.position![0] === 8 
                    })}
                    style={{ 
                        top: `${DEFAULT_CELL_SIZE * figure.position![1]}px`, 
                        left: `${DEFAULT_CELL_SIZE * figure.position![0]}px`,
                        transition: !!change && change.withTransition ? 'all .15s ease-out' : 'none' 
                    }}
                />
            )}
        </div>
    )
}