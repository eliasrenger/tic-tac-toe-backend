import { Injectable } from '@nestjs/common';
import { CreateBoardStateDto } from './dto/create-boardState.dto';
import { TicTacToeAgent } from './tic-tac-toe-agent';

@Injectable()
export class TicTacToeAgentService {
    // qData: Object;

    // constructor() {
    //     this.qData = TicTacToeAgent.loadQData();
    // }

    makeMove(createBoardStateDto: CreateBoardStateDto): CreateBoardStateDto {
        // const move = this.qData[createBoardStateDto.squares.join('')];
        return createBoardStateDto;
    }
}
