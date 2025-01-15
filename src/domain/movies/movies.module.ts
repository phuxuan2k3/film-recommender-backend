import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movies.schema';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from 'src/common/const';
import { MoviesTrendingDay, MoviesTrendingDaySchema } from './schemas/movies-trending-day.schema';
import { MoviesTrendingWeek, MoviesTrendingWeekSchema } from './schemas/movies-trending-week.schema';
import { MoviesPopular, MoviesPopularSchema } from './schemas/movies-popular.schema';
import { MoviesExportService } from './exports/movie-export.service';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';
import { UsersModule } from '../users/users.module';

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
    forwardRef(() => UsersModule),
    forwardRef(() => FirebaseAdminModule)
  ],
  providers: [
    MoviesService,
    MoviesExportService
  ],
  controllers: [MoviesController],
  exports: [MoviesExportService]
})
export class MoviesModule { }