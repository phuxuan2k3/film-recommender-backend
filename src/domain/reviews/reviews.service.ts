import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/reviews.schema';
import { Model } from 'mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { AddReviewBody } from './request/add-review.body';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name, REST_CONNECTION_NAME) private reviewModel: Model<ReviewDocument>,
    ) { }

    async getReviews(movie_id: number): Promise<Review[]> {
        return this.reviewModel.find({ movie_id: movie_id }).lean();
    }

    async createReview(userInfoRating: {
        name: string,
        email: string,
        avatar_path: string,
        rating: string
    }, movie_id: number, body: AddReviewBody): Promise<{ id: string }> {
        const created_at = new Date().toISOString();
        const id = uuidv4();
        await this.reviewModel.create({
            id: id,
            created_at,
            author: userInfoRating.name,
            author_details: {
                name: userInfoRating.name,
                username: userInfoRating.email,
                avatar_path: userInfoRating.avatar_path,
                rating: userInfoRating.rating,
            },
            content: body.content,
            movie_id: movie_id,
        });
        return { id };
    }

    async deleteReview(review_id: string): Promise<void> {
        await this.reviewModel.deleteOne({ id: review_id });
    }
}
