import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BaseDocument = HydratedDocument<Base>;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    },
    toObject: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            delete ret._id;
        },
    },
})
export class Base {
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const BaseSchema = SchemaFactory.createForClass(Base);