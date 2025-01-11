import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersActionService } from './services/users-aggregate.service';
import { UsersService } from './services/users.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserCreateBody } from './request/user-create.body';
import { UsersAccountService } from './exports/users-account.service';
import { UserUpdateBody } from './request/user-update.body';

// todo: get users from token
const user_id = "abc";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersAggregateService: UsersActionService,
        private readonly userInfoService: UsersService,
        private readonly usersAccountService: UsersAccountService
    ) { }

    @Get(':user_id')
    async getUser() {
        await this.userInfoService.getDetail(user_id);
    }

    // Todo: Test route 
    @Post('create')
    async createUser(@Body() body: UserCreateBody) {
        return await this.usersAccountService.create(body);
    }

    @Post('update')
    async updateUser(@Body() body: UserUpdateBody) {
        await this.userInfoService.update(body);
    }

    @Post('delete/:user_id')
    async deleteUser(@Param() param: { user_id: string }) {
        await this.userInfoService.delete(param.user_id);
    }

    @Post('rating/add/:movie_id')
    async addRating(@Param() param: { movie_id: number }, @Body() body: { rating: number }) {
        await this.usersAggregateService.addRating(user_id, param.movie_id, body.rating);
    }

    @Post('rating/remove/:movie_id')
    async removeRating(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.removeRating(user_id, param.movie_id);
    }

    @Get('rating')
    async getRatingMovies() {
        await this.usersAggregateService.getRatingMovies(user_id);
    }

    @Post('favorite/add/:movie_id')
    async addFavorite(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.addFavorite(user_id, param.movie_id);
    }

    @Post('favorite/remove/:movie_id')
    async removeFavorite(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.removeFavorite(user_id, param.movie_id);
    }

    @Get('favorite')
    async getFavoriteMovies() {
        await this.usersAggregateService.getFavoriteMovies(user_id);
    }

    @Post('watchlist/add/:movie_id')
    async addWatchlist(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.addWatchlist(user_id, param.movie_id);
    }

    @Post('watchlist/remove/:movie_id')
    async removeWatchlist(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.removeWatchlist(user_id, param.movie_id);
    }

    @Get('watchlist')
    async getWatchlistMovies() {
        await this.usersAggregateService.getWatchlistMovies(user_id);
    }

    @Post('history/add/:movie_id')
    async addHistory(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.addHistory(user_id, param.movie_id);
    }

    @Post('history/remove/:movie_id')
    async removeHistory(@Param() param: { movie_id: number }) {
        await this.usersAggregateService.removeHistory(user_id, param.movie_id);
    }

    @Get('history')
    async getHistoryMovies() {
        await this.usersAggregateService.getHistoryMovies(user_id);
    }
}
