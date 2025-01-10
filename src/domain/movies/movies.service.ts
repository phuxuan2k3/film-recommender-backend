import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchParam } from './dtos/search.param';
import { Movie, MovieDocument } from './movies.entity';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    ) { }

    async all(): Promise<Movie[]> {
        return await this.movieModel.find({}).limit(10).exec();
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
