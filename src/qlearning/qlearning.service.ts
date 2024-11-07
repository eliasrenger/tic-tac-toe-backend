import { Injectable } from '@nestjs/common';
import { CreateBoardStateDto } from './dto/create-boardState.dto';

@Injectable()
export class QlearningService {
    private qTable: number[][] = [[3]];

    makeMove(createBoardStateDto: CreateBoardStateDto): CreateBoardStateDto {
        if (createBoardStateDto.xIsNext) {
            createBoardStateDto.squares[3] = "X";
        } else {
            createBoardStateDto.squares[3] = "O";
        }
        createBoardStateDto.xIsNext = !createBoardStateDto.xIsNext;
        return createBoardStateDto;
    }
}
