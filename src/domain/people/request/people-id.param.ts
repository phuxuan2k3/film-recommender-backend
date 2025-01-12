import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class PeopleIdParam {
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    people_id: number;
}