import {
    IsArray,
    IsBoolean,
    ArrayMinSize,
    ArrayMaxSize,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateBoardStateDto {
    @IsArray()
    @ArrayMinSize(9)
    @ArrayMaxSize(9)
    @IsString({ each: true })
    squares: string[];

    @IsBoolean()
    xIsNext: boolean;

    @IsOptional()
    @IsNumber()
    action?: number;
}
