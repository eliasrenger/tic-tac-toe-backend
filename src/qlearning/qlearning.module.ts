import { Module } from '@nestjs/common';
import { QlearningService } from './qlearning.service';
import { QlearningController } from './qlearning.controller';

@Module({
  providers: [QlearningService],
  controllers: [QlearningController],
})
export class QlearningModule {}
