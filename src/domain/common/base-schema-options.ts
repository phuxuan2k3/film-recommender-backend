import { SchemaOptions } from 'mongoose';

// Define the base schema options
const baseSchemaOptions: SchemaOptions = {
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id; // Remove the `_id` field
            delete ret.__v; // Remove the `__v` field
            return ret;
        },
    },
    toObject: {
        versionKey: false,
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
};

// Export the base schema options for reuse
export { baseSchemaOptions };
