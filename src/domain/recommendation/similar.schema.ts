import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'similar', timestamps: true })
export class Similar {
    @Prop({ required: true })
    tmdb_id: string;

    @Prop({ type: [String], required: true })
    similar: string[];
}

export const SimilarSchema = SchemaFactory.createForClass(Similar);