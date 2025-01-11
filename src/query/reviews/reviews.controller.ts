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
        return this.reviewsService.createReview(param.movie_id, body);
    }

    @Post('delete/:review_id')
    async deleteReview(@Param() param: { review_id: string }) {
        return this.reviewsService.deleteReview(param.review_id);
    }
}
