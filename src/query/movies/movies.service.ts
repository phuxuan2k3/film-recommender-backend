import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchParam } from './params/search.param';
import { Movie } from './schemas/movies.schema';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from 'src/common/const';
import { MovieSmallPresenter } from './presenter/movies-small.presenter';
import { TrendingParam } from './params/trending.param';
import { MoviesTrendingDay } from './schemas/movies-trending-day.schema';
import { MoviesTrendingWeek } from './schemas/movies-trending-week.schema';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name, MOVIES_CONNECTION_NAME) private movieModel: Model<Movie>,
        @InjectModel(MoviesTrendingDay.name, REST_CONNECTION_NAME) private moviesTrendingDayModel: Model<MoviesTrendingDay>,
        @InjectModel(MoviesTrendingWeek.name, REST_CONNECTION_NAME) private moviesTrendingWeekModel: Model<MoviesTrendingWeek>
    ) { }

    async all(): Promise<MovieSmallPresenter[]> {
        const docs = await this.movieModel.find({}, MovieSmallPresenter.getProjection()).limit(10).lean();
        return docs;
    }

    async querySearch(searchParam: SearchParam): Promise<MovieSmallPresenter[]> {
        const { query, include_adult: includeAdult, page, limit, year } = searchParam;
        const queryObj: any = {};
        if (query != null) queryObj.name = { $regex: query, $options: 'i' };
        if (includeAdult != null) queryObj.includeAdult = includeAdult;
        if (year != null) queryObj.year = {
            $gte: new Date(year, 0, 1),
            $lte: new Date(year, 11, 31)
        };
        const movies = await this.movieModel
            .find({}, MovieSmallPresenter.getProjection())
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        return movies;
    }

    async getTrendingMovies(param: TrendingParam): Promise<MovieSmallPresenter[]> {
        const { time_window, page, limit } = param;
        if (time_window === "day") {
            const docs = await this.moviesTrendingDayModel
                .find({}, MovieSmallPresenter.getProjection())
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            return docs;
        }
        else if (time_window === "week") {
            const docs = await this.moviesTrendingWeekModel
                .find({}, MovieSmallPresenter.getProjection())
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            return docs;
        }
        return null;
    }
}
