import { Type } from 'class-transformer';
import { IsBoolean, IsBooleanString, IsNumber, IsNumberString, IsString, Max, Min } from 'class-validator'

export class SearchParam {
    @IsString()
    name: string;

    @IsBooleanString()
    includeAdult: boolean;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(10000)
    page: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @Max(50)
    perPage: number;
}