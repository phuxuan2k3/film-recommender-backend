import { IsString } from "class-validator";

export class AddReviewBody {
    @IsString()
    content: string;
}