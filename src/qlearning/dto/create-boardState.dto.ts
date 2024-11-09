import {
  IsArray,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from 'class-validator';

export class CreateBoardStateDto {
  @IsArray()
  @ArrayMinSize(9)
  @ArrayMaxSize(9)
  @IsString({ each: true })
  squares: string[];

  @IsBoolean()
  xIsNext: boolean;
}
