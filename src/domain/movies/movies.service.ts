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
        return await this.movieModel.find().exec();
    }

    async querySearch(searchParam: SearchParam): Promise<Movie[]> {
        const { name, includeAdult, page, perPage } = searchParam;
        const movies = await this.movieModel
            .find({
                title: { $regex: name, $options: 'i' },
                adult: includeAdult,
            })
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        return movies;
    }
}
