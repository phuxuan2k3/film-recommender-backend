import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class AddReviewParam {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    movie_id: number;
}