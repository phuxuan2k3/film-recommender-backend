import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Genre, GenreDocument } from './genres.schema';

@Injectable()
export class GenresService {
    constructor(
        @InjectModel(Genre.name, REST_CONNECTION_NAME) private genreModel: Model<GenreDocument>,
    ) { }

    async all(): Promise<Genre[]> {
        return this.genreModel.find().lean();
    }
}
