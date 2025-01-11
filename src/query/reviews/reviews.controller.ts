import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewBody } from './request/review.body';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private reviewsService: ReviewsService
    ) { }

    @Get(':movie_id')
    async getReviews(@Param() param: { movie_id: number }) {
        return this.reviewsService.getReviews(param.movie_id);
    }

    @Post('add/:movie_id')
    async createReview(@Param() param: { movie_id: number }, @Body() body: ReviewBody) {
        const userInfoRating = {
            name: 'John Doe',
            email: 'john@gmail.com',
            avatar_path: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
            rating: '5'
        };
        return this.reviewsService.createReview(userInfoRating, param.movie_id, body);
    }

    @Post('delete/:review_id')
    async deleteReview(@Param() param: { review_id: string }) {
        return this.reviewsService.deleteReview(param.review_id);
    }
}
