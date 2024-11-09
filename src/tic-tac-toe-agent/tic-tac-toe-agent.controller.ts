import { Body, Controller, Ip, ValidationPipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { TicTacToeAgentService } from './tic-tac-toe-agent.service';
import { CreateBoardStateDto } from './dto/create-boardState.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('tic-tac-toe-agent')
export class TicTacToeAgentController {
    constructor(
        private readonly ticTacToeAgentService: TicTacToeAgentService,
    ) {}
    private readonly loggerService = new LoggerService(
        TicTacToeAgentController.name,
    );

    @Get('move') // GET /tic-tac-toe-agent/move
    makeMove(
        @Ip() ip: string,
        @Body(ValidationPipe) createBoardStateDto: CreateBoardStateDto,
    ): CreateBoardStateDto {
        this.loggerService.log(
            `Request a move\t${ip}`,
            TicTacToeAgentController.name,
        );
        return this.ticTacToeAgentService.makeMove(createBoardStateDto);
    }
}
