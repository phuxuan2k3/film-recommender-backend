import { Prop } from '@nestjs/mongoose';

export class PeopleSmallBase {
    @Prop({ type: Number, required: true, unique: true })
    id: number;

    @Prop({ type: Number, required: true })
    tmdb_id: number;

    @Prop({ type: Boolean, required: true })
    adult: boolean;

    @Prop({ type: Number, required: true })
    gender: number;

    @Prop({ type: String, required: true })
    known_for_department: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    popularity: number;

    @Prop({ type: String, required: true })
    profile_path: string;
}