import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { QlearningModule } from './qlearning/qlearning.module';

@Module({
  imports: [
    QlearningModule, 
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule {}
