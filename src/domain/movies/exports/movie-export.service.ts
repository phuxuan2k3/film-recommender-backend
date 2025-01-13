import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MOVIES_CONNECTION_NAME } from 'src/common/const';
import { MovieSmallPresenter } from '../response/movies-small.presenter';
import { Movie } from '../schemas/movies.schema';

@Injectable()
export class MoviesExportService {
    constructor(
        @InjectModel(Movie.name, MOVIES_CONNECTION_NAME) private movieModel: Model<Movie>
    ) { }

    async getMovieByIds(id: number[]): Promise<MovieSmallPresenter[]> {
        const docs = await this.movieModel
            .find({
                id: { $in: id }
            }, MovieSmallPresenter.getProjection())
            .lean();
        return docs;
    }

    async getMovieById(id: number): Promise<MovieSmallPresenter> {
        const doc = await this.movieModel
            .findOne({
                id: id
            }, MovieSmallPresenter.getProjection())
            .lean();
        return doc;
    }
}
