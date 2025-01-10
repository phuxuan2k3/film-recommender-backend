import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { Genre } from '../../genres/genre.entity';

export type MovieDocument = HydratedDocument<Movie>

@Schema({ collection: 'movies', timestamps: true, strict: true })
export class Movie {
    @Prop()
    adult: boolean;

    @Prop()
    backdrop_path: string;

    @Prop()
    budget: number;

    @Prop([String])
    categories: string[];

    @Prop([{ type: Types.ObjectId, ref: 'genres' }])
    genres: Genre;

    @Prop()
    homepage: string;

    @Prop({ unique: true })
    id: number;

    @Prop([String])
    origin_country: string[];

    @Prop()
    overview: string;

    @Prop()
    popularity: number;

    @Prop()
    poster_path: string;

    @Prop()
    release_date: string;

    @Prop()
    revenue: number;

    @Prop()
    status: string;

    @Prop()
    tagline: string;

    @Prop()
    title: string;

    @Prop()
    video: boolean;

    @Prop()
    vote_average: number;

    @Prop()
    vote_count: number;

    @Prop({
        type: {
            cast: [Number],
            crew: [Number],
        },
    })
    credits: {
        cast: { id: number }[];
        crew: { id: number }[];
    };

    @Prop([{
        iso_639_1: String,
        iso_3166_1: String,
        name: String,
        key: String,
        site: String,
        size: Number,
        type: String,
        official: Boolean,
        published_at: String,
        id: String,
    }])
    trailers: {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
    }[];

    @Prop([String])
    similar_movies: string[];

    @Prop([{
        user: {
            id: Number,
            name: String,
            avt_path: String,
        },
        rating: Number,
        comment: String,
        created_at: String,
    }])
    reviews: {
        user: {
            id: number;
            name: string;
            avt_path: string;
        };
        rating: number;
        comment: string;
        created_at: string;
    }[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie)
