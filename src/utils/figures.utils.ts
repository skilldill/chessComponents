import { Cell, Figure } from "core/JSChessEngine";

/**
 * Возвращает класс для фигуры в клетке
 */
export const getFigureCSS = (figure: Figure) => 
    `${figure.type}-${figure.color}`;

/**
 * Возвращает белая ли клетка
 */
export const getIsLightCell = (rowId: number, cellId: number) =>
    (rowId % 2 === 0) && (cellId % 2 === 0) ||
    (rowId % 2 > 0) && (cellId % 2 > 0)

/**
 * Функция, которая просто создает массив размером size
 */
export const getFilledArrayBySize = (size: number) => {
    const array: number[] = [];

    for(let i = 0; i < size; i++) {
        array.push(i);
    }

    return array;
}

/**
 * Возвращает только массив фигурам у которых
 * есть поле position
 */
export const mapCellsToFiguresArray = (boardState: Cell[][]) => {
    const figuresWithPosition: Figure[] = [];

    boardState.forEach((row, j) => row.forEach((cell, i) => {
        if (cell.figure) {
            figuresWithPosition.push({
                ...cell.figure,
                position: [i, j],
            });
        }
    }));

    return figuresWithPosition;
}

/**
 * 
 * @param possibleMoves Список возможных ходов
 * @param position позиция для проверки
 */
export const checkIsPossibleMove = (possibleMoves: number[][], position: number[]) => {
    return !!possibleMoves.find((possibleMove) => 
        possibleMove[0] === position[0] && possibleMove[1] === position[1]
    );
}
