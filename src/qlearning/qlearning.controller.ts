import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { QlearningService } from './qlearning.service';
import { CreateBoardStateDto } from './dto/create-boardState.dto';

@Controller('qlearning')
export class QlearningController {

    constructor(private readonly qlearningService: QlearningService) {}

    @Get('move') // GET /qlearning/move
    makeMove(@Body(ValidationPipe) createBoardStateDto: CreateBoardStateDto): CreateBoardStateDto {
        return this.qlearningService.makeMove(createBoardStateDto);
    }
}
