import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/reviews.schema';
import { Model } from 'mongoose';
import { REST_CONNECTION_NAME } from 'src/common/const';
import { ReviewBody } from './request/review.body';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name, REST_CONNECTION_NAME) private reviewModel: Model<ReviewDocument>,
    ) { }

    async getReviews(movie_id: number): Promise<Review[]> {
        return this.reviewModel.find({ movie_id: movie_id }).lean();
    }

    async createReview(movie_id: number, body: ReviewBody): Promise<{ id: string }> {
        const created_at = new Date().toISOString();
        // todo: get user details from token
        const user_temp = {
            name: 'name',
            username: 'username',
            avatar_path: 'avatar_path',
            rating: 10,
        };
        const id = uuidv4();
        await this.reviewModel.create({
            id: id,
            created_at,
            author: user_temp.name,
            author_details: {
                name: user_temp.name,
                username: user_temp.username,
                avatar_path: user_temp.avatar_path,
                rating: user_temp.rating,
            },
            content: body.content,
            movie_id: movie_id,
        });
        return { id };
    }

    async deleteReview(review_id: string): Promise<void> {
        await this.reviewModel.findByIdAndDelete(review_id);
    }
}
