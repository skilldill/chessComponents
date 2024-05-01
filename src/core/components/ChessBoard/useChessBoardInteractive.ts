import { Cell, Figure, FigureColor, JSChessEngine, MoveData, stateToFEN } from "../../../core/JSChessEngine";
import { useEffect, useState } from "react"
import { checkIsPossibleMove, checkPositionsHas } from "./utils";
import { ChangeMove } from "./models";

type UseChessBoardInteractiveProps = {
  onChange: (moveData: MoveData) => void;
}

export const useChessBoardInteractive = (props: UseChessBoardInteractiveProps) => {
  const { onChange } = props;

  const [initialState, setInitialState] = useState<Cell[][]>([]);
  const [actualState, setActualState] = useState<Cell[][]>([]);
  const [fromPos, setFromPos] = useState<number[]>([-1, -1]);
  const [holdedFigure, setHoldedFigure] = useState<Figure>();
  const [grabbingPos, setGrabbingPos] = useState<number[]>([-1, -1]);
  const [possibleMoves, setPossibleMoves] = useState<number[][]>([]);
  const [boardReversed, setBoardReversed] = useState(false);
  const [currentColor, setCurrentColor] = useState<FigureColor>('white');
  const [playerColor, setPlayerColor] = useState<FigureColor>();
  const [newMove, setNewMove] = useState<ChangeMove>();
  const [linesWithCheck, setLinesWithCheck] = useState<number[][][]>([]);

  const clearFromPos = () => setFromPos([-1, -1]);
  const clearGrabbingPos = () => setGrabbingPos([-1, -1]);
  const clearPossibleMoves = () => setPossibleMoves([]);
  const toggleCurrentColor = () => setCurrentColor((prevColor) => prevColor === 'white' ? 'black' : 'white');

  const cleanAll = () => {
    setHoldedFigure(undefined);
    clearFromPos();
    clearGrabbingPos();
    clearPossibleMoves();
  }

  const reverseChessBoard = () => {
    cleanAll();
    setActualState((prevState) => JSChessEngine.reverseChessBoard(prevState));
    setBoardReversed((prevReversed) => !prevReversed);
  }

  const selectFrom = (cellPos: number[]) => {
    const cell = actualState[cellPos[1]][cellPos[0]];

    if (!cell.figure) {
      cleanAll();
      return;
    }

    const { figure } = cell;

    if (figure.color !== currentColor) {
      cleanAll();
      return;
    }

    const nextMoves = JSChessEngine.getNextMoves(
      actualState,
      cellPos,
      [], // TODO: добавить линии с шахом
      boardReversed // Добавить определение reverse
    );

    setPossibleMoves(nextMoves);

    setHoldedFigure(cell.figure);
    setFromPos(cellPos);
  }

  const moveFigure = (from: number[], to: number[], figure: Figure) => {
    const inNextMoves = checkPositionsHas(possibleMoves, to);

    // Проверка, что начальная позиция не равняется следующей
    // и то что inNextMoves будет true
    const conditionForDoMove =
      (to[0] !== from[0] || to[1] !== from[1]) && inNextMoves;

    if (!conditionForDoMove) return;

    const changedState = JSChessEngine.changeState(
      actualState,
      figure,
      to,
      from,
      boardReversed
    );

    // Если playetColor не задан, то
    // Доска работает в режиме анализа
    // Можно менять состояние внутри доски
    if (playerColor === undefined) setActualState(changedState);

    // Пешка дошла до конца доски
    // Показываем FigurePicker
    // И изменяем состояние с превращением пешки
    if (
      figure.type === 'pawn' &&
      (to[1] === 0 || to[1] === actualState.length - 1)
    ) {
      // setTargetPos(to);
      // setShowFigurePicker(true);
      return;
    }

    const colorFEN = currentColor === 'white' ? 'black' : 'white';
    const FEN = stateToFEN(changedState, colorFEN)

    // Собранные данные для отправки
    const moveData: MoveData = { figure, from, to, FEN };
    
    // setMoveVector([from, to]);
    // onChange(changedState, moveData);

    toggleCurrentColor();

    setHoldedFigure(undefined);
    clearFromPos();
    clearGrabbingPos();

    return moveData;
  }

  

  const handleGrabbing = (x: number, y: number) => {
    setGrabbingPos([x, y]);
  }

  const handleGrabEnd = (cellPos: number[], withTransition = false) => {
    if (fromPos[0] === -1) return;
    if (!holdedFigure) return;
    if (possibleMoves.length === 0) return;
    
    const foundPosInPossible = checkIsPossibleMove(possibleMoves, cellPos);

    if (!foundPosInPossible) return;
    
    const move = moveFigure(fromPos, cellPos, holdedFigure);
    if (!move) return;

    onChange(move);

    setNewMove({ move, withTransition });

    clearGrabbingPos();
    clearPossibleMoves();
  }

  const handleClick = (cellPos: number[]) => {
    if (fromPos[0] === -1) {
      selectFrom(cellPos);
      return;
    }
    
    const foundPosInPossible = checkIsPossibleMove(possibleMoves, cellPos);
    if (!foundPosInPossible) {
      cleanAll();
      return;
    }

    handleGrabEnd(cellPos, true);
  }

  return {
    fromPos,
    grabbingPos,
    actualState,
    initialState,
    holdedFigure,
    possibleMoves,
    newMove,

    setInitialState,
    setActualState,
    selectFrom,
    clearFromPos,
    handleClick,
    handleGrabbing,
    handleGrabEnd,
    setCurrentColor,
    reverseChessBoard,
  }
}