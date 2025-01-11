import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersActionService } from './services/users-aggregate.service';
import { UsersPersonalService } from './services/users-personal.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersActionService,
        private readonly userInfoService: UsersPersonalService
    ) { }

    @Get(':user_id')
    async getUser() {

    }

    @Post('rating/add/:movie_id')
    async addRating(@Param() param: { movie_id: number }) {
    }

    @Post('rating/remove/:movie_id')
    async removeRating() {
    }

    @Get('rating')
    async getRatingMovies() {
    }

    @Post('favorite/add/:movie_id')
    async addFavorite() {
    }

    @Post('favorite/remove/:movie_id')
    async removeFavorite() {
    }

    @Get('favorite')
    async getFavoriteMovies() {
    }

    @Post('watchlist/add/:movie_id')
    async addWatchlist() {
    }

    @Post('watchlist/remove/:movie_id')
    async removeWatchlist() {
    }

    @Get('watchlist')
    async getWatchlistMovies() {
    }
}
