import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ collection: 'movies', timestamps: true })
export class Movie {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop({ select: false })
    tmdb_id: number;

    @Prop()
    adult: boolean;

    @Prop()
    backdrop_path: string;

    @Prop({
        type: {
            id: Number,
            name: String,
            poster_path: String,
            backdrop_path: String,
        },
    })
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    };

    @Prop()
    budget: number;

    @Prop([String])
    categories: string[];

    @Prop([
        {
            id: Number,
            name: String,
        },
    ])
    genres: {
        id: number;
        name: string;
    }[];

    @Prop()
    homepage: string;

    @Prop()
    id: number;

    @Prop()
    imdb_id: string;

    @Prop([String])
    origin_country: string[];

    @Prop()
    original_language: string;

    @Prop()
    original_title: string;

    @Prop()
    overview: string;

    @Prop()
    popularity: number;

    @Prop()
    poster_path: string;

    @Prop([
        {
            id: Number,
            logo_path: String,
            name: String,
            origin_country: String,
        },
    ])
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];

    @Prop([
        {
            iso_3166_1: String,
            name: String,
        },
    ])
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];

    @Prop()
    release_date: string;

    @Prop()
    revenue: number;

    @Prop()
    runtime: number;

    @Prop([
        {
            english_name: String,
            iso_639_1: String,
            name: String,
        },
    ])
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];

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
            id: Number,
            cast: [
                {
                    adult: Boolean,
                    gender: Number,
                    id: Number,
                    known_for_department: String,
                    name: String,
                    original_name: String,
                    popularity: Number,
                    profile_path: String,
                    cast_id: Number,
                    character: String,
                    credit_id: String,
                    order: Number,
                },
            ],
            crew: [
                {
                    adult: Boolean,
                    gender: Number,
                    id: Number,
                    known_for_department: String,
                    name: String,
                    original_name: String,
                    popularity: Number,
                    profile_path: String,
                    credit_id: String,
                    department: String,
                    job: String,
                },
            ],
        },
    })
    credits: {
        id: number;
        cast: {
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            cast_id: number;
            character: string;
            credit_id: string;
            order: number;
        }[];
        crew: {
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            credit_id: string;
            department: string;
            job: string;
        }[];
    };

    @Prop([
        {
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
        },
    ])
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

    @Prop([
        {
            id: Number,
            name: String,
        },
    ])
    keywords: {
        id: number;
        name: string;
    }[];

    @Prop({
        type: [{
            author: String,
            author_details: {
                name: String,
                username: String,
                avatar_path: String,
                rating: Number
            },
            content: String,
            created_at: String,
            id: String,
            updated_at: String,
            url: String
        }]
    })
    reviews: {
        author: string;
        author_details: {
            name: string;
            username: string;
            avatar_path: string;
            rating: number;
        };
        content: string;
        created_at: string;
        id: string;
        updated_at: string;
        url: string;
    }[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);