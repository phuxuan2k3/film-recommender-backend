import { IsString } from "class-validator";

export class ReviewIdParam {
    @IsString()
    review_id: string;
}