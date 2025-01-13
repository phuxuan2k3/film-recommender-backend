import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { LlmService } from './services/llm.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from '../movies/schemas/movies.schema';
import { LLM_CONNECTION_NAME } from 'src/common/const';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema }
    ], LLM_CONNECTION_NAME)
  ],
  controllers: [LlmController],
  providers: [LlmService]
})
export class LlmModule { }
