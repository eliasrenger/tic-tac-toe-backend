import { Injectable } from '@nestjs/common';
import { CreateBoardStateDto } from './dto/create-boardState.dto';
import { TicTacToeAgent } from './tic-tac-toe-agent';

@Injectable()
export class TicTacToeAgentService {

    private ticTacToeAgent = new TicTacToeAgent();

    constructor() {
        this.ticTacToeAgent.loadQTable();
    }

    makeMove(createBoardStateDto: CreateBoardStateDto): CreateBoardStateDto {
        return this.ticTacToeAgent.makeMove(createBoardStateDto);
    }
}
