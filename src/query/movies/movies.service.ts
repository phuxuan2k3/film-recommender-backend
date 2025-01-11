import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchQuery } from './request/search.query';
import { Movie } from './schemas/movies.schema';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from 'src/common/const';
import { MovieSmallPresenter } from './response/movies-small.presenter';
import { TrendingParam } from './request/trending.param';
import { MoviesTrendingDay } from './schemas/movies-trending-day.schema';
import { MoviesTrendingWeek } from './schemas/movies-trending-week.schema';
import { PagingQuery } from '../common/paging.query';
import { PagingResult } from '../common/paging.result';
import { totalPage } from '../common/helper/total-page';

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

    async querySearch(searchParam: SearchQuery): Promise<PagingResult<MovieSmallPresenter>> {
        const { query, include_adult: includeAdult, page, limit, year } = searchParam;
        const queryObj: any = {};
        if (query != null) queryObj.name = { $regex: query, $options: 'i' };
        if (includeAdult != null) queryObj.includeAdult = includeAdult;
        if (year != null) queryObj.year = {
            $gte: new Date(year, 0, 1),
            $lte: new Date(year, 11, 31)
        };
        const results = await this.movieModel
            .find({}, MovieSmallPresenter.getProjection())
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total_results = await this.movieModel.countDocuments(queryObj);
        const total_pages = totalPage(total_results, limit);
        return {
            page,
            results,
            total_results,
            total_pages
        };
    }

    async getTrendingMovies(param: TrendingParam, query: PagingQuery): Promise<MovieSmallPresenter[]> {
        const { time_window } = param;
        const { page, limit } = query;
        console.log(time_window, page, limit);
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
