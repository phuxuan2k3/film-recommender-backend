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
import { MoviesPopular } from './schemas/movies-popular.schema';
import { getYouTubeLink } from '../common/helper/link';
import { TrailersPresenter } from './response/trailers.presenter';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name, MOVIES_CONNECTION_NAME) private movieModel: Model<Movie>,
        @InjectModel(MoviesTrendingDay.name, REST_CONNECTION_NAME) private moviesTrendingDayModel: Model<MoviesTrendingDay>,
        @InjectModel(MoviesTrendingWeek.name, REST_CONNECTION_NAME) private moviesTrendingWeekModel: Model<MoviesTrendingWeek>,
        @InjectModel(MoviesPopular.name, REST_CONNECTION_NAME) private moviesPopularModel: Model<MoviesPopular>
    ) { }

    async all(): Promise<MovieSmallPresenter[]> {
        const docs = await this.movieModel.find({}, MovieSmallPresenter.getProjection()).limit(10).lean();
        return docs;
    }

    async querySearch(searchParam: SearchQuery): Promise<PagingResult<MovieSmallPresenter>> {
        const { query, include_adult: includeAdult, page, limit, year } = searchParam;
        const queryObj: any = {};
        if (query != null) queryObj.title = { $regex: query, $options: 'i' };
        if (includeAdult != null) queryObj.adult = includeAdult;
        if (year != null) queryObj.release_date = new RegExp(`^${year}-`);
        const results = await this.movieModel
            .find(queryObj, MovieSmallPresenter.getProjection())
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

    async getTrendingMovies(param: TrendingParam, query: PagingQuery): Promise<PagingResult<MovieSmallPresenter>> {
        const { time_window } = param;
        const { page, limit } = query;
        console.log(time_window, page, limit);
        if (time_window === "day") {
            const docs = await this.moviesTrendingDayModel
                .find({}, MovieSmallPresenter.getProjection())
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            const total_results = await this.moviesTrendingDayModel.countDocuments();
            const total_pages = totalPage(total_results, limit);
            return {
                page,
                results: docs,
                total_results,
                total_pages
            };
        }
        else if (time_window === "week") {
            const docs = await this.moviesTrendingWeekModel
                .find({}, MovieSmallPresenter.getProjection())
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            const total_results = await this.moviesTrendingWeekModel.countDocuments();
            const total_pages = totalPage(total_results, limit);
            return {
                page,
                results: docs,
                total_results,
                total_pages
            };
        }
        return null;
    }

    async getPopularMovies(query: PagingQuery): Promise<PagingResult<MovieSmallPresenter>> {
        const { page, limit } = query;
        const docs = await this.moviesPopularModel
            .find({}, MovieSmallPresenter.getProjection())
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total_results = await this.moviesPopularModel.countDocuments();
        const total_pages = totalPage(total_results, limit);
        return {
            page,
            results: docs,
            total_results,
            total_pages
        };
    }

    async getPopularMovieLatestTrailers(query: PagingQuery): Promise<TrailersPresenter[]> {
        const { page, limit } = query;
        const populars = await this.moviesPopularModel
            .find({}, { id: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const ids = populars.map(p => p.id);
        const movies = await this.movieModel
            .find({ id: { $in: ids } }, { trailers: 1 })
            .lean();
        const movieTrailer = movies.map((m) => {
            if (m.trailers == null || m.trailers.length == 0) return null;
            const latestTrailers = m.trailers.filter(t => t.type === 'Trailer' && t.site === 'YouTube').sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
            if (latestTrailers.length == 0) return null;
            const latestTrailer = {
                ...(latestTrailers[0]),
                link: getYouTubeLink(latestTrailers[0].key)
            } as TrailersPresenter;
            return latestTrailer;
        });
        const movieTrailerResult = movieTrailer.filter((m) => m != null);
        return movieTrailerResult;
    }
}
