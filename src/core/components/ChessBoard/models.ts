import { MoveData } from "core/JSChessEngine"

export type ChangeMove = {
    move: MoveData;
    withTransition?: boolean;
}
