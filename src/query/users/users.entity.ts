import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ collection: 'users' })
export class Genre {
    id: number;
    name: string;
}

export const GerneSchema = SchemaFactory.createForClass(Genre);