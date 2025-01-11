import { Type } from 'class-transformer';
import { IsBooleanString, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { PagingQuery as PagingQuery } from 'src/query/common/dto/paging.query';

export class SearchQuery extends PagingQuery {
    @IsOptional()
    @IsString()
    query: string;

    @IsOptional()
    @IsBooleanString()
    include_adult: boolean;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(1900)
    @Max(2025)
    year: number;
}