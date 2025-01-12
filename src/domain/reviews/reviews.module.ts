import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Review, ReviewSchema } from './schemas/reviews.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema }
    ], REST_CONNECTION_NAME)
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule { }
