import { Module } from '@nestjs/common';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Similar, SimilarSchema } from './similar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Similar.name, schema: SimilarSchema }
    ], REST_CONNECTION_NAME),
  ],
  providers: [RecommendationService],
  controllers: [RecommendationController]
})
export class RecommendationModule { }
