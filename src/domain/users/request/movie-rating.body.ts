import { IsNumber } from "class-validator";

export class MovieRatingBody {
    @IsNumber()
    rating: number;
}