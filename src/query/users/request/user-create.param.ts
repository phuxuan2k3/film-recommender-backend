import { IsString } from "class-validator";

export class UserCreateParam {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    country: string;

    @IsString()
    address: string;

    @IsString()
    avatar_path: string;
}