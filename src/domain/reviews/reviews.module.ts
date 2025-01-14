import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { Review, ReviewSchema } from './schemas/reviews.schema';
import { UsersModule } from '../users/users.module';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema }
    ], REST_CONNECTION_NAME),
    UsersModule,
    FirebaseAdminModule
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule { }
