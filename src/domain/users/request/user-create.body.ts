import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UserCreateBody {
    @IsString()
    @IsOptional()
    first_name: string | null;

    @IsString()
    @IsOptional()
    last_name: string | null;

    @IsString()
    @IsEmail()
    @IsOptional()
    email: string | null;

    @IsString()
    @IsOptional()
    phone: string | null;

    @IsString()
    @IsOptional()
    country: string | null;

    @IsString()
    @IsOptional()
    address: string | null;

    @IsString()
    @IsOptional()
    avatar_path: string | null;

    @IsOptional()
    role: number | null;
}
