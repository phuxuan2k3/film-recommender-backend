import { Type } from 'class-transformer';
import { IsBooleanString, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { PagingParam } from 'src/query/common/paging.param';

export class SearchParam extends PagingParam {
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