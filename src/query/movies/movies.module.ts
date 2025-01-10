import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movies.schema';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from 'src/common/const';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
    ], MOVIES_CONNECTION_NAME),
  ],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule { }
