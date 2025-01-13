import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SimilarDocument = HydratedDocument<Similar>;

@Schema({ collection: 'similar', timestamps: true })
export class Similar {
    @Prop({ type: Number, required: true })
    tmdb_id: number;

    @Prop({
        type: [{
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
            vote_count: { type: Number, required: true }
        }],
        required: true
    })
    similar_movies: {
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
    }[];
}

export const SimilarSchema = SchemaFactory.createForClass(Similar);