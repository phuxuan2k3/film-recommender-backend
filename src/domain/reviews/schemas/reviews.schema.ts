import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews', timestamps: true })
export class Review {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    author: string;

    @Prop({
        required: true,
        type: {
            name: String,
            username: String,
            avatar_path: String,
            rating: String
        }
    })
    author_details: {
        name: string;
        username: string;
        avatar_path: string;
        rating: number;
    }

    @Prop({ required: true })
    content: string;

    @Prop()
    created_at: string;

    @Prop({ required: true })
    movie_id: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);