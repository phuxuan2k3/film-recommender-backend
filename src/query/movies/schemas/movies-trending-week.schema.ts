import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MoviesTrendingWeekDocument = HydratedDocument<MoviesTrendingWeek>;

@Schema({ collection: 'movies_trending_week', timestamps: true })
export class MoviesTrendingWeek {
    @Prop({ type: String })
    _id: string;

    @Prop({ type: Number })
    tmdb_id: number;

    @Prop({ type: Boolean })
    adult: boolean;

    @Prop({ type: String })
    backdrop_path: string;

    @Prop({ type: [String] })
    categories: string[];

    @Prop({ type: [Number] })
    genre_ids: number[];

    @Prop({ type: Number })
    id: number;

    @Prop({ type: String })
    media_type: string;

    @Prop({ type: String })
    original_language: string;

    @Prop({ type: String })
    original_title: string;

    @Prop({ type: String })
    overview: string;

    @Prop({ type: Number })
    popularity: number;

    @Prop({ type: String })
    poster_path: string;

    @Prop({ type: Date })
    release_date: Date;

    @Prop({ type: String })
    title: string;

    @Prop({ type: Boolean })
    video: boolean;

    @Prop({ type: Number })
    vote_average: number;

    @Prop({ type: Number })
    vote_count: number;
}

export const MoviesTrendingWeekSchema = SchemaFactory.createForClass(MoviesTrendingWeek);