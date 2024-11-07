import { Injectable } from '@nestjs/common';

interface BoardState {
    squares: string[];
    xIsNext: boolean;
}

@Injectable()
export class QlearningService {
    private qTable: number[][] = [[3]];

    makeMove(boardState: BoardState): BoardState {
        if (boardState.xIsNext) {
            boardState.squares[3] = "X";
        } else {
            boardState.squares[3] = "O";
        }
        boardState.xIsNext = !boardState.xIsNext;
        return boardState;
    }
}
