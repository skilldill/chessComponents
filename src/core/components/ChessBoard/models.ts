import { MoveData } from "core/JSChessEngine"

export type ChangeMove = {
    moves: MoveData[];
    withTransition?: boolean;
}
