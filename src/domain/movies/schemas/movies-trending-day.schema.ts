import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MoviesSmallSchemaBase } from "./base/movies-small.base-schema";

export type MoviesTrendingDayDocument = HydratedDocument<MoviesTrendingDay>;

@Schema({ collection: 'movies_trending_day', timestamps: true })
export class MoviesTrendingDay extends MoviesSmallSchemaBase {

}

export const MoviesTrendingDaySchema = SchemaFactory.createForClass(MoviesTrendingDay);