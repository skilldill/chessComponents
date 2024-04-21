import { FC, MouseEvent, useEffect, useState } from "react";
import styles from './ChessBoard.module.css';
import { getFilledArrayBySize } from "../../../utils/figures.utils";
import cn from 'classnames';

const BASE_BOARD_SIZE = 8

type ChessBoardControlLayoutProps = {
    size?: number;

    onSelect: (position: number[]) => void;
    onGrabStart: (position: number[]) => void;
    onGrabEnd: (position: number[]) => void;
    onGrabbing: (x: number, y: number) => void;
}

export const ChessBoardControlLayout: FC<ChessBoardControlLayoutProps> = (props) => {
    const { 
        size = BASE_BOARD_SIZE, 
        onSelect, 
        onGrabStart,
        onGrabEnd,
        onGrabbing,
    } = props;

    const [chessBoardControlLayoutHtml, setChessBoardControlLayoutHtml] = useState<HTMLElement | null>();
    const [pressed, setPressed] = useState(false);

    // Инициализация доски
    useEffect(() => {
        const chessBoardRef = document.getElementById('chessBoardControlLayout');
        setChessBoardControlLayoutHtml(chessBoardRef);
    }, []);

    const handleClick = (cellPos: number[]) => {
        onSelect(cellPos);
    }

    const handleGrabStart = (cellPos: number[]) => {
        setPressed(true);
        onGrabStart(cellPos);
    }

    const handleGrabEnd = (cellPos: number[]) => {
        setPressed(false);
        onGrabEnd(cellPos);
    }

    const handleGrabing = (event: MouseEvent) => {
        if (pressed) {
            const { pageX, pageY } = event;
            const { offsetLeft, offsetTop } = chessBoardControlLayoutHtml!;
    
            const posX = pageX - offsetLeft;
            const posY = pageY - offsetTop;

            onGrabbing(posX, posY);
        }
    }

    return (
        <div 
            className={cn(styles.controlLayout, {[styles.controlLayoutGrabbing]: pressed})}
            onMouseMove={handleGrabing}
        >
            {getFilledArrayBySize(size).map((_, j) => 
                <div className={styles.row} key={`control-layout-${j}`}>
                    {getFilledArrayBySize(size).map((_, i) => (
                        <div 
                            onClick={() => handleClick([i, j])}
                            className={styles.controlCell}
                            key={`control-layout-${i}`}
                            onMouseDown={() => handleGrabStart([i, j])}
                            onMouseUp={() => handleGrabEnd([i, j])}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    )
}