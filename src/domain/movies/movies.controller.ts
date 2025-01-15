import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SearchQuery } from './request/search.query';
import { TrendingParam } from './request/trending.param';
import { PagingQuery } from '../common/dto/paging.query';
import { MovieIdParam } from './request/movie-id.param';
import { Public } from 'src/auth/public';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';
import { UsersService } from '../users/services/users.service';

@Public()
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService,
        private readonly jwtService: JwtService,
        private readonly firebaseAuthService: FirebaseAuthService,
        private readonly usersService: UsersService
    ) { }

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
    async getReviews(@Request() req, @Param() param: MovieIdParam) {
        console.log('====go to here');
        const jwt = req.headers.authorization.split(' ')[1];
        const decodedJwt = this.jwtService.decode(jwt);
        const user = await this.firebaseAuthService.getUserByEmail(decodedJwt.email);
        if (!await this.firebaseAuthService.getUserByEmail(decodedJwt.email)) {
            throw new Error('User not found');
        }
        const u = await this.firebaseAuthService.getUserByEmail(decodedJwt.email);
        const udb = await this.usersService.getDetail(u.uid);

        console.log(udb.email, udb.avatar_path);

        if (udb.avatar_path !== undefined && udb.avatar_path !== '') {
            return await this.moviesService.getMovieReviews(param.movie_id);
        }

        return null;

        //xtodo: fix here
    }

    @Get(':movie_id')
    async getMovieDetail(@Param() param: MovieIdParam) {
        return await this.moviesService.getMovieDetail(param.movie_id);
    }
}
