import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PeopleDocument = HydratedDocument<People>;

@Schema({ collection: 'people', timestamps: true })
export class People {
    @Prop({ type: Number, required: true, unique: true })
    id: number;

    @Prop({ type: Number, required: true })
    tmdb_id: number;

    @Prop({ type: Boolean, required: true })
    adult: boolean;

    @Prop({ type: [String], required: true })
    also_known_as: string[];

    @Prop({ type: String, required: true })
    biography: string;

    @Prop({ type: String, required: true })
    birthday: string;

    @Prop({ type: String, default: null })
    deathday: string | null;

    @Prop({ type: Number, required: true })
    gender: number;

    @Prop({ type: String, required: true })
    homepage: string;

    @Prop({ type: String, required: true })
    imdb_id: string;

    @Prop({ type: String, required: true })
    known_for_department: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    place_of_birth: string;

    @Prop({ type: Number, required: true })
    popularity: number;

    @Prop({ type: String, required: true })
    profile_path: string;

    @Prop({
        type: {
            cast: [{
                adult: { type: Boolean, required: true },
                backdrop_path: { type: String, required: true },
                genre_ids: { type: [Number], required: true },
                id: { type: Number, required: true },
                original_language: { type: String, required: true },
                original_title: { type: String, required: true },
                overview: { type: String, required: true },
                popularity: { type: Number, required: true },
                poster_path: { type: String, required: true },
                release_date: { type: String, required: true },
                title: { type: String, required: true },
                video: { type: Boolean, required: true },
                vote_average: { type: Number, required: true },
                vote_count: { type: Number, required: true },
                character: { type: String, required: true },
                credit_id: { type: String, required: true },
                order: { type: Number, required: true }
            }],
            crew: [{
                adult: { type: Boolean, required: true },
                backdrop_path: { type: String, required: true },
                genre_ids: { type: [Number], required: true },
                id: { type: Number, required: true },
                original_language: { type: String, required: true },
                original_title: { type: String, required: true },
                overview: { type: String, required: true },
                popularity: { type: Number, required: true },
                poster_path: { type: String, required: true },
                release_date: { type: String, required: true },
                title: { type: String, required: true },
                video: { type: Boolean, required: true },
                vote_average: { type: Number, required: true },
                vote_count: { type: Number, required: true },
                department: { type: String, required: true },
                job: { type: String, required: true },
                credit_id: { type: String, required: true }
            }]
        },
        required: true
    })
    movie_credits: {
        cast: {
            adult: boolean;
            backdrop_path: string;
            genre_ids: number[];
            id: number;
            original_language: string;
            original_title: string;
            overview: string;
            popularity: number;
            poster_path: string;
            release_date: string;
            title: string;
            video: boolean;
            vote_average: number;
            vote_count: number;
            character: string;
            credit_id: string;
            order: number;
        }[];
        crew: {
            adult: boolean;
            backdrop_path: string;
            genre_ids: number[];
            id: number;
            original_language: string;
            original_title: string;
            overview: string;
            popularity: number;
            poster_path: string;
            release_date: string;
            title: string;
            video: boolean;
            vote_average: number;
            vote_count: number;
            department: string;
            job: string;
            credit_id: string;
        }[];
    };
}

export const PeopleSchema = SchemaFactory.createForClass(People);