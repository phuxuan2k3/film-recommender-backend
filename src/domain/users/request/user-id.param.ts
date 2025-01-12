import { IsString } from "class-validator";

export class UserIdParam {
    @IsString()
    user_id: string;
}