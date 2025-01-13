import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LLM_CONNECTION_NAME, MOVIES_CONNECTION_NAME } from "src/common/const";
import { MoviesExportService } from "src/domain/movies/exports/movie-export.service";
import { MoviesService } from "src/domain/movies/movies.service";
import { MovieSmallPresenter } from "src/domain/movies/response/movies-small.presenter";
import { Movie } from "src/domain/movies/schemas/movies.schema";

@Injectable()
export class MoviesLLMService {
    constructor(
        @InjectModel(Movie.name, LLM_CONNECTION_NAME) private movieModel: Model<Movie>,

        private readonly moviesExportService: MoviesExportService
    ) { }

    async transferMovies(mongo_id: string[]): Promise<MovieSmallPresenter[]> {
        const llmMovies = await this.movieModel
            .find({ _id: { $in: mongo_id } })
            .select({ _id: 0, id: 1 })
            .lean();
        const ids = llmMovies.map(m => m.id);
        const movies = await this.moviesExportService.getMovieByIds(ids);
        return movies;
    }
}