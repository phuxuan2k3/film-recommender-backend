import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema({ collection: 'genres_movie', timestamps: true })
export class Genre {
    @Prop({ type: Number, required: true, unique: true })
    id: number;

    @Prop({ type: String, required: true, unique: true, trim: true })
    name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);