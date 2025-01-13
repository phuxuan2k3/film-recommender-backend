import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchQuery } from './request/search.query';
import { TrendingParam } from './request/trending.param';
import { PagingQuery } from '../common/dto/paging.query';
import { MovieIdParam } from './request/movie-id.param';

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

    @Get('latest-trailers')
    async getLatestTrailers(@Query() query: PagingQuery) {
        return await this.moviesService.getPopularMovieLatestTrailers(query);
    }

    @Get('popular')
    async getPopularMovies(@Query() query: PagingQuery) {
        return await this.moviesService.getPopularMovies(query);
    }

    @Get('cast/:movie_id')
    async getCast(@Param() param: MovieIdParam) {
        return await this.moviesService.getMovieCast(param.movie_id);
    }

    @Get('reviews/:movie_id')
    async getReviews(@Param() param: MovieIdParam) {
        return await this.moviesService.getMovieReviews(param.movie_id);
    }

    @Get(':movie_id')
    async getMovieDetail(@Param() param: MovieIdParam) {
        return await this.moviesService.getMovieDetail(param.movie_id);
    }
}
