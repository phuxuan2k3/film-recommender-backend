import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { MoviesModule } from './domain/movies/movies.module';
import { UsersModule } from './domain/users/users.module';
import { MOVIES_CONNECTION_NAME, REST_CONNECTION_NAME } from './common/const';
import { ReviewsModule } from './domain/reviews/reviews.module';
import { GenresModule } from './domain/genres/genres.module';
import { PeopleController } from './domain/people/people.controller';
import { PeopleService } from './domain/people/people.service';
import { PeopleModule } from './domain/people/people.module';
import { RecommendationModule } from './domain/recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 10, }]),

    MongooseModule.forRoot(process.env.MONGO_URL_MOVIES, {
      dbName: process.env.MONGO_DB_MOVIES || "TMDB",
      connectionName: MOVIES_CONNECTION_NAME
    }),
    MongooseModule.forRoot(process.env.MONGO_URL_REST, {
      dbName: process.env.MONGO_DB_REST || "TMDB",
      connectionName: REST_CONNECTION_NAME
    }),

    AuthModule,
    ProfileModule,
    MoviesModule,
    UsersModule,
    ReviewsModule,
    GenresModule,
    PeopleModule,
    RecommendationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
