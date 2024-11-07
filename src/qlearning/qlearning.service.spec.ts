import { Test, TestingModule } from '@nestjs/testing';
import { QlearningService } from './qlearning.service';

describe('QlearningService', () => {
  let service: QlearningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QlearningService],
    }).compile();

    service = module.get<QlearningService>(QlearningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
