import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    country: string;

    @Prop()
    address: string;

    @Prop()
    avatar_path: string;

    @Prop({
        type: [{
            movie_id: Number,
            rating: Number,
            created_at: String
        }]
    })
    rating_movies_id: {
        movie_id: number;
        rating: number;
        created_at: string;
    }[];

    @Prop({
        type: [{
            movie_id: Number,
            created_at: String
        }]
    })
    favorite_movies_id: {
        movie_id: number;
        created_at: string;
    }[];

    @Prop([{
        movie_id: Number,
        created_at: String
    }])
    watchlist_movies_id: {
        movie_id: number;
        created_at: string;
    }[];

    @Prop([{
        movie_id: Number,
        created_at: String
    }])
    history_movies_id: {
        movie_id: number;
        created_at: string;
    }[];

    @Prop()
    role: number; // 0: basic, 1: premium
}

export const UserSchema = SchemaFactory.createForClass(User);