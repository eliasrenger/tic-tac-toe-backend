import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TicTacToeAgentModule } from './tic-tac-toe-agent/tic-tac-toe-agent.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [
        TicTacToeAgentModule,
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000,
                limit: 10,
            },
            {
                name: 'long',
                ttl: 60000,
                limit: 1000,
            },
        ]),
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
