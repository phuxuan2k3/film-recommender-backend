import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { PagingQuery } from "src/domain/common/dto/paging.query";

export class LLMSearchQuery extends PagingQuery {
    @IsString()
    @MaxLength(5000)
    query: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Max(100)
    @Min(2)
    amount?: number = 100;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @Max(1)
    @Min(0)
    threshold?: number = 0.25;
}