import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PagingQuery {
    @IsNumber()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 20;
}