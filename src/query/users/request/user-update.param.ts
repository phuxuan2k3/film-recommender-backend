import { PartialType } from "@nestjs/mapped-types";
import { UserCreateParam } from "./user-create.param";
import { IsString } from "class-validator";

export class UserUpdateParam extends PartialType(UserCreateParam) {
    @IsString()
    id: string;
}