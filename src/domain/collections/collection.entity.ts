
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
export class Collection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export const CatSchema = SchemaFactory.createForClass(Collection);
