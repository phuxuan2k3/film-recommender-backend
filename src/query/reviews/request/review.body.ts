import { IsOptional, IsString } from "class-validator";

export class ReviewBody {
    @IsOptional()
    @IsString()
    content: string;
}