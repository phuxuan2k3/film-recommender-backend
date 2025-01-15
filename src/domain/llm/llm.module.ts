import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { LlmService } from './services/llm.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../movies/schemas/movies.schema';
import { LLM_CONNECTION_NAME } from 'src/common/const';
import { MoviesModule } from '../movies/movies.module';
import { MoviesLLMService } from './services/movies-llm.service';
import { RouteHandlerService } from './services/route-handler.service';
import { Genre, GenreSchema } from '../genres/genres.schema';
import { Similar, SimilarSchema } from './schemas/similar.schema';
import { People, PeopleSchema } from '../people/schemas/people.schema';

@Module({
  imports: [
    HttpModule,

    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Genre.name, schema: GenreSchema },
      { name: Similar.name, schema: SimilarSchema },
      { name: People.name, schema: PeopleSchema }
    ], LLM_CONNECTION_NAME),

    MoviesModule
  ],
  controllers: [LlmController],
  providers: [
    LlmService,
    MoviesLLMService,
    RouteHandlerService
  ]
})
export class LlmModule { }
