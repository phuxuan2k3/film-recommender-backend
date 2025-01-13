import { IsString } from "class-validator";

export class NavigateBody {
    @IsString()
    query: string;
}