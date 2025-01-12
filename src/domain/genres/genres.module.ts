import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './genres.schema';
import { REST_CONNECTION_NAME } from 'src/common/const';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Genre.name,
        schema: GenreSchema,
        collection: 'genres_movie',
      },
    ], REST_CONNECTION_NAME),
  ],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule { }
