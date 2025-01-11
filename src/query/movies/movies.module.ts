import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movies.schema';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from 'src/common/const';
import { MoviesTrendingDay, MoviesTrendingDaySchema } from './schemas/movies-trending-day.schema';
import { MoviesTrendingWeek, MoviesTrendingWeekSchema } from './schemas/movies-trending-week.schema';
import { MoviesPopular, MoviesPopularSchema } from './schemas/movies-popular.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
    ], MOVIES_CONNECTION_NAME),
    MongooseModule.forFeature([
      { name: MoviesTrendingDay.name, schema: MoviesTrendingDaySchema },
      { name: MoviesTrendingWeek.name, schema: MoviesTrendingWeekSchema },
      { name: MoviesPopular.name, schema: MoviesPopularSchema }
    ], REST_CONNECTION_NAME),
  ],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule { }
