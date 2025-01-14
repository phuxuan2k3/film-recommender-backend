import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Model } from 'mongoose';
import { MoviesExportService } from 'src/domain/movies/exports/movie-export.service';
import { MovieSmallPresenter } from 'src/domain/movies/response/movies-small.presenter';
import { UserMovieInfo } from '../response/user-movie-info';

@Injectable()
export class UsersActionService {
    constructor(
        @InjectModel(User.name, REST_CONNECTION_NAME) private userModel: Model<User>,
        private readonly moviesExportService: MoviesExportService
    ) { }

    async addRating(user_id: string, movie_id: number, rating: number): Promise<void> {
        const now = new Date();
        await this.userModel.updateOne(
            { id: user_id },
            {
                $push: {
                    rating_movies_id: {
                        movie_id,
                        rating,
                        created_at: now.toISOString()
                    }
                }
            }
        );
    }

    async removeRating(user_id: string, movie_id: number): Promise<void> {
        await this.userModel.updateOne(
            { id: user_id },
            {
                $pull: {
                    rating_movies_id: {
                        movie_id
                    }
                }
            }
        );
    }

    async getRatingMovies(user_id: string): Promise<MovieSmallPresenter[]> {
        const user = await this.userModel.findOne({ id: user_id }).exec();
        if (!user) return null;
        const movieIds = user.rating_movies_id.map((item) => item.movie_id);
        return this.moviesExportService.getMovieByIds(movieIds);
    }

    async addFavorite(user_id: string, movie_id: number): Promise<void> {
        const now = new Date();
        const user = await this.userModel.findOne({ id: user_id }).lean();
        if (!user) return null;
        if (user.favorite_movies_id.findIndex((item) => item.movie_id === movie_id) !== -1) {
            await this.userModel.updateOne(
                { id: user_id },
                {
                    $push: {
                        favorite_movies_id: {
                            movie_id,
                            created_at: now.toISOString()
                        }
                    }
                }
            );
        } else {
            await this.userModel.updateOne(
                { id: user_id },
                {
                    $pull: {
                        favorite_movies_id: {
                            movie_id,
                            created_at: now.toISOString()
                        }
                    }
                }
            );
        }
    }

    async removeFavorite(user_id: string, movie_id: number): Promise<void> {
        await this.userModel.updateOne(
            { id: user_id },
            {
                $pull: {
                    favorite_movies_id: {
                        movie_id
                    }
                }
            }
        );
    }

    async getFavoriteMovies(user_id: string): Promise<MovieSmallPresenter[]> {
        const user = await this.userModel.findOne({ id: user_id }).exec();
        if (!user) return null;
        const movieIds = user.favorite_movies_id.map((item) => item.movie_id);
        return this.moviesExportService.getMovieByIds(movieIds);
    }

    async addWatchlist(user_id: string, movie_id: number): Promise<void> {
        const now = new Date();
        const user = await this.userModel.findOne({ id: user_id }).lean();
        if (!user) return null;
        if (user.watchlist_movies_id.findIndex((item) => item.movie_id === movie_id) !== -1) {
            await this.userModel.updateOne(
                { id: user_id },
                {
                    $push: {
                        watchlist_movies_id: {
                            movie_id,
                            created_at: now.toISOString()
                        }
                    }
                }
            );
        } else {
            await this.userModel.updateOne(
                { id: user_id },
                {
                    $pull: {
                        watchlist_movies_id: {
                            movie_id,
                            created_at: now.toISOString()
                        }
                    }
                }
            );
        }
    }

    async removeWatchlist(user_id: string, movie_id: number): Promise<void> {
        await this.userModel.updateOne(
            { id: user_id },
            {
                $pull: {
                    watchlist_movies_id: {
                        movie_id
                    }
                }
            }
        );
    }

    async getWatchlistMovies(user_id: string): Promise<MovieSmallPresenter[]> {
        const user = await this.userModel.findOne({ id: user_id }).exec();
        if (!user) return null;
        const movieIds = user.watchlist_movies_id.map((item) => item.movie_id);
        return this.moviesExportService.getMovieByIds(movieIds);
    }

    async addHistory(user_id: string, movie_id: number): Promise<void> {
        const now = new Date();
        await this.userModel.updateOne(
            { id: user_id },
            {
                $push: {
                    history_movies_id: {
                        movie_id,
                        created_at: now.toISOString()
                    }
                }
            }
        );
    }

    async removeHistory(user_id: string, movie_id: number): Promise<void> {
        await this.userModel.updateOne(
            { id: user_id },
            {
                $pull: {
                    history_movies_id: {
                        movie_id
                    }
                }
            }
        );
    }

    async getHistoryMovies(user_id: string): Promise<MovieSmallPresenter[]> {
        const user = await this.userModel.findOne({ id: user_id }).exec();
        if (!user) return null;
        const movieIds = user.history_movies_id.map((item) => item.movie_id);
        return this.moviesExportService.getMovieByIds(movieIds);
    }

    async getMoviesInfoInUser(user_id: string, movie_id: number): Promise<UserMovieInfo> {
        const user = await this.userModel.findOne({ id: user_id }).lean();
        if (!user) return null;
        const favorite_index = user.favorite_movies_id.findIndex((item) => item.movie_id === movie_id);
        const watchlist_index = user.watchlist_movies_id.findIndex((item) => item.movie_id === movie_id);
        const rated_index = user.rating_movies_id.findIndex((item) => item.movie_id === movie_id);
        return {
            is_favorite: favorite_index !== -1,
            is_watchlist: watchlist_index !== -1,
            is_rated: rated_index !== -1,
            score_rated: rated_index !== -1 ? user.rating_movies_id[rated_index].rating : -1
        }
    }
}
