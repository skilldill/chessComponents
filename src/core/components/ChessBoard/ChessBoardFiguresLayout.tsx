import { Cell, Figure, MoveData } from "../../../core/JSChessEngine";
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
            // console.log(change.withTransition);
            setActualState((prevState) => {
                const updatedState = [...prevState];

                change.moves.forEach((moveData) => {
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
                    className={cn([styles.figure, getFigureCSS(figure)])}
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