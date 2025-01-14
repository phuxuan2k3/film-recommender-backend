import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AddReviewBody } from './request/add-review.body';
import { AddReviewParam } from './request/add-review.param';
import { ReviewIdParam } from './request/review-id.param';
import { MovieIdParam } from '../movies/request/movie-id.param';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../domain/users/services/users.service';
import { FirebaseAuthService } from 'src/firebase-auth/firebase-auth.service';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private reviewsService: ReviewsService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private firebaseAuthService: FirebaseAuthService
    ) { }

    @Get(':movie_id')
    async getReviews(@Request() req, @Param() param: MovieIdParam) {

        const jwt = req.headers.authorization.split(' ')[1];
        const decodedJwt = this.jwtService.decode(jwt);
        const user = await this.firebaseAuthService.getUserByEmail(decodedJwt.email);
        if (!await this.firebaseAuthService.getUserByEmail(decodedJwt.email)) {
            throw new Error('User not found');
        }

        const userDB = await this.usersService.getDetail(user.uid);
        if (!userDB) {
            throw new Error('User not found');
        }

        if (userDB.role > 0) {
            return this.reviewsService.getReviews(param.movie_id);
        }
        return null;
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