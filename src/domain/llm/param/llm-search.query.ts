import { IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { PagingQuery } from "src/domain/common/dto/paging.query";

export class LLMSearchQuery extends PagingQuery {
    @IsString()
    @MaxLength(5000)
    query: string;

    @IsNumber()
    @IsOptional()
    @IsInt()
    @Max(100)
    @Min(2)
    threshold?: number = 100;

    @IsNumber()
    @IsOptional()
    @Max(1)
    @Min(0)
    amount?: number = 0.25;
}