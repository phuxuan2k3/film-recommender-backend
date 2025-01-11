import { OmitType, PartialType } from "@nestjs/mapped-types";
import { UserCreateBody } from "./user-create.body";
import { IsString } from "class-validator";

export class UserUpdateBody extends PartialType(OmitType(UserCreateBody, ['email'])) {
    @IsString()
    id: string;
}