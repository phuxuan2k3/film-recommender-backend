import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchParam } from './params/search.param';
import { TrendingParam } from './params/trending.param';

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

    @Get('trending/:time_window')
    async getTrendingMovies(@Param() param: TrendingParam) {
        return await this.moviesService.getTrendingMovies(param);
    }
}
