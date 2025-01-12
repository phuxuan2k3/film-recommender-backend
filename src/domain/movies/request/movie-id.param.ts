import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class MovieIdParam {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    movie_id: number;
}