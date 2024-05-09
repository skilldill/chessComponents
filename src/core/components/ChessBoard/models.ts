import { CellPos, MoveData } from "core/JSChessEngine"

export type ChangeMove = {
    move: MoveData;
    withTransition?: boolean;
    attackedPos?: CellPos; // for pawn and beated field
}
