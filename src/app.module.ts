import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QlearningModule } from './qlearning/qlearning.module';

@Module({
  imports: [QlearningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
