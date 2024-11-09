import { Test, TestingModule } from '@nestjs/testing';
import { TicTacToeAgentService } from './tic-tac-toe-agent.service';

describe('TicTacToeAgentService', () => {
    let service: TicTacToeAgentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TicTacToeAgentService],
        }).compile();

        service = module.get<TicTacToeAgentService>(TicTacToeAgentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
