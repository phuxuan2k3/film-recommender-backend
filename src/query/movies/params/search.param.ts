import { Type } from 'class-transformer';
import { IsBooleanString, IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator'

export class SearchParam {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsBooleanString()
    include_adult: boolean;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1900)
    @Max(2025)
    year: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(10000)
    page: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    per_page: number;
}