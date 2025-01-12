import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleIdParam } from './request/people-id.param';

@Controller('people')
export class PeopleController {
    constructor(
        private readonly peopleService: PeopleService
    ) { }

    @Get(':people_id')
    async getDetail(@Param() param: PeopleIdParam) {
        return this.peopleService.getDetail(param.people_id);
    }

    @Get('acting/:people_id')
    async getActingList(@Param() param: PeopleIdParam) {
        return this.peopleService.getActingList(param.people_id);
    }
}
