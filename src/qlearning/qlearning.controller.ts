import { Body, Controller, Ip, ValidationPipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { QlearningService } from './qlearning.service';
import { CreateBoardStateDto } from './dto/create-boardState.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('qlearning')
export class QlearningController {
  constructor(private readonly qlearningService: QlearningService) {}
  private readonly loggerService = new LoggerService(QlearningController.name);

  @Get('move') // GET /qlearning/move
  makeMove(
    @Ip() ip: string,
    @Body(ValidationPipe) createBoardStateDto: CreateBoardStateDto,
  ): CreateBoardStateDto {
    this.loggerService.log(`Request a move\t${ip}`, QlearningController.name);
    return this.qlearningService.makeMove(createBoardStateDto);
  }
}
