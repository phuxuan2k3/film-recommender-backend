import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
    id: number;
    name: string;
}

export const CatSchema = SchemaFactory.createForClass(Genre);