import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchParam } from './dtos/search.param';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('all')
    async all() {
        return await this.moviesService.all();
    }

    @Get('search')
    async querySearch(@Query() searchParam: SearchParam) {
        return await this.moviesService.querySearch(searchParam);
    }
}
