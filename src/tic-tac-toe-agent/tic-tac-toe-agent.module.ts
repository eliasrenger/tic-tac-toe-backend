import { Module } from '@nestjs/common';
import { TicTacToeAgentService } from './tic-tac-toe-agent.service';
import { TicTacToeAgentController } from './tic-tac-toe-agent.controller';

@Module({
    providers: [TicTacToeAgentService],
    controllers: [TicTacToeAgentController],
})
export class TicTacToeAgentModule {}
