import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersActionService } from './services/users-aggregate.service';
import { UsersService } from './services/users.service';
import { UserUpdateBody } from './request/user-update.body';
import { UserIdParam } from './request/user-id.param';
import { MovieIdParam } from '../movies/request/movie-id.param';
import { MovieRatingBody } from './request/movie-rating.body';
import { JwtPayload, JwtPayloadData } from 'src/auth/decorator/jwt-payload';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersAggregateService: UsersActionService,
        private readonly userInfoService: UsersService,
    ) { }

    // // Todo: Test route 
    // @Post('create')
    // async createUser(@Body() body: UserCreateBody) {
    //     return await this.usersAccountService.create(body);
    // }

    @Post('update')
    async updateUser(@Body() body: UserUpdateBody) {
        return await this.userInfoService.update(body);
    }

    @Post('delete/:user_id')
    async deleteUser(@Param() param: UserIdParam) {
        return await this.userInfoService.delete(param.user_id);
    }

    // Personal Routes

    @Get('/movie/:movie_id')
    async getUserMovies(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.getMoviesInfoInUser(id, param.movie_id);
    }

    @Post('rating/add/:movie_id')
    async addRating(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam, @Body() body: MovieRatingBody) {
        const email = payload.email;
        const id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.addRating(id, param.movie_id, body.rating);
    }

    @Post('rating/remove/:movie_id')
    async removeRating(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.removeRating(user_id, param.movie_id);
    }

    @Get('rating')
    async getRatingMovies(@JwtPayload() payload: JwtPayloadData) {
        console.log('getRatingMovies -> payload', payload);
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.getRatingMovies(user_id);
    }

    @Post('favorite/add/:movie_id')
    async addFavorite(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.addFavorite(user_id, param.movie_id);
    }

    @Post('favorite/remove/:movie_id')
    async removeFavorite(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.removeFavorite(user_id, param.movie_id);
    }

    @Get('favorite')
    async getFavoriteMovies(@JwtPayload() payload: JwtPayloadData) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.getFavoriteMovies(user_id);
    }

    @Post('watchlist/add/:movie_id')
    async addWatchlist(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.addWatchlist(user_id, param.movie_id);
    }

    @Post('watchlist/remove/:movie_id')
    async removeWatchlist(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.removeWatchlist(user_id, param.movie_id);
    }

    @Get('watchlist')
    async getWatchlistMovies(@JwtPayload() payload: JwtPayloadData) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.getWatchlistMovies(user_id);
    }

    @Post('history/add/:movie_id')
    async addHistory(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.addHistory(user_id, param.movie_id);
    }

    @Post('history/remove/:movie_id')
    async removeHistory(@JwtPayload() payload: JwtPayloadData, @Param() param: MovieIdParam) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.removeHistory(user_id, param.movie_id);
    }

    @Get('history')
    async getHistoryMovies(@JwtPayload() payload: JwtPayloadData) {
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.usersAggregateService.getHistoryMovies(user_id);
    }

    @Get('self')
    async getSelf(@JwtPayload() payload: JwtPayloadData) {
        console.log('getSelf -> payload', payload);
        const email = payload.email;
        const user_id = await this.userInfoService.getUserIdFromEmail(email);
        return await this.userInfoService.getDetail(user_id);
    }

    @Get(':user_id')
    async getUser(@Param() param: UserIdParam) {
        const user = await this.userInfoService.getDetail(param.user_id);
        if (!user) {
            return {
                message: 'User not found'
            }
        }
        return user;
    }
}
