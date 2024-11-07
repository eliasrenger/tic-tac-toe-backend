import { Test, TestingModule } from '@nestjs/testing';
import { QlearningController } from './qlearning.controller';

describe('QlearningController', () => {
  let controller: QlearningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QlearningController],
    }).compile();

    controller = module.get<QlearningController>(QlearningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
