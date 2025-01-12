import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MoviesSmallSchemaBase } from "./base/movies-small.base-schema";

export type MoviesTrendingWeekDocument = HydratedDocument<MoviesTrendingWeek>;

@Schema({ collection: 'movies_trending_week', timestamps: true })
export class MoviesTrendingWeek extends MoviesSmallSchemaBase {

}

export const MoviesTrendingWeekSchema = SchemaFactory.createForClass(MoviesTrendingWeek);