import { Body, Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { QlearningService } from './qlearning.service';

interface BoardState {
    squares: string[];
    xIsNext: boolean;
}

@Controller('qlearning')
export class QlearningController {

    constructor(private readonly qlearningService: QlearningService) {}

    @Get('move') // GET /qlearning/move
    makeMove(@Body() boardState: BoardState): BoardState {
        return this.qlearningService.makeMove(boardState);
    }
}
