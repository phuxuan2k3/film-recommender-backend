import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MoviesSmallSchemaBase } from "./base/movies-small.base-schema";

export type MoviesPopularDocument = HydratedDocument<MoviesPopular>;

@Schema({ collection: 'movies_popular', timestamps: true })
export class MoviesPopular extends MoviesSmallSchemaBase {
}

export const MoviesPopularSchema = SchemaFactory.createForClass(MoviesPopular);