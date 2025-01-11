import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PagingParam {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform((value: any) => value ?? 20)
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number;
}