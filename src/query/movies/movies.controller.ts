import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchQuery } from './request/search.query';
import { TrendingParam } from './request/trending.param';
import { PagingQuery } from '../common/paging.query';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('all')
    async all() {
        return await this.moviesService.all();
    }

    @Get('search')
    async querySearch(@Query() query: SearchQuery) {
        return await this.moviesService.querySearch(query);
    }

    @Get('trending/:time_window')
    async getTrendingMovies(@Param() param: TrendingParam, @Query() query: PagingQuery) {
        return await this.moviesService.getTrendingMovies(param, query);
    }
}
