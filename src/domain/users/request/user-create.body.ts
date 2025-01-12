import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class UserCreateBody {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    @IsEmail()
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