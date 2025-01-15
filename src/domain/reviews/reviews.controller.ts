import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AddReviewBody } from './request/add-review.body';
import { AddReviewParam } from './request/add-review.param';
import { ReviewIdParam } from './request/review-id.param';
import { MovieIdParam } from '../movies/request/movie-id.param';
import { UsersService } from '../../domain/users/services/users.service';
import { Public } from 'src/auth/public';

@Public()
@Controller('reviews')
export class ReviewsController {
    constructor(
        private reviewsService: ReviewsService,
    ) { }

    @Get(':movie_id')
    async getReviews(@Param() param: MovieIdParam) {

        return this.reviewsService.getReviews(param.movie_id);

    }

    @Post('add/:movie_id')
    async createReview(@Param() param: AddReviewParam, @Body() body: AddReviewBody) {
        const userInfoRating = {
            name: 'John Doe',
            email: 'john@gmail.com',
            avatar_path: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
            rating: '5'
        };
        return this.reviewsService.createReview(userInfoRating, param.movie_id, body);
    }

    @Post('delete/:review_id')
    async deleteReview(@Param() param: ReviewIdParam) {
        return this.reviewsService.deleteReview(param.review_id);
    }
}