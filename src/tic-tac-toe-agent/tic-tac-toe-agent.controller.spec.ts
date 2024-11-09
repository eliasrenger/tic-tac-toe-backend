import { Test, TestingModule } from '@nestjs/testing';
import { TicTacToeAgentController } from './tic-tac-toe-agent.controller';

describe('TicTacToeAgentController', () => {
    let controller: TicTacToeAgentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TicTacToeAgentController],
        }).compile();

        controller = module.get<TicTacToeAgentController>(
            TicTacToeAgentController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
