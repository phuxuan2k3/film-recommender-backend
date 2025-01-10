import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchParam } from '../params/search.param';
import { Movie, MovieDocument } from '../schemas/movies.schema';
import { MOVIES_CONNECTION_NAME } from 'src/common/const';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name, MOVIES_CONNECTION_NAME) private movieModel: Model<MovieDocument>,
    ) { }

    async all(): Promise<Movie[]> {
        const res = await this.movieModel.find({}).limit(10).transform((doc) => {
            return doc;
        }).exec();
        return res;
    }

    async querySearch(searchParam: SearchParam): Promise<Movie[]> {
        const { name, include_adult: includeAdult, page, per_page: perPage, year } = searchParam;
        const query: any = {};
        if (name != null) query.name = { $regex: name, $options: 'i' };
        if (includeAdult != null) query.includeAdult = includeAdult;
        if (year != null) query.year = {
            $gte: new Date(year, 0, 1),
            $lte: new Date(year, 11, 31)
        };
        const movies = await this.movieModel
            .find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        return movies;
    }
}
