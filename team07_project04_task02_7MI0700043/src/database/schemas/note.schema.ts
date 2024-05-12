import { Schema } from 'mongoose';

export const NoteSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: {
        type: Schema.Types.String,
        required: true,
    },
    content: {
        type: Schema.Types.String,
        required: true,
    },
    createDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    updateDate: {
        type: Schema.Types.Date,
        default: new Date(),
    },
    status: {
        type: Schema.Types.String,
        required: true,
        enum: ['open', 'in progress', 'resolved'],
    }
});