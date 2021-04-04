import mongoose, { Schema } from 'mongoose';

const ContentSchema: Schema = new Schema({
    userId: {
        type: String
    },
    text: { 
        type: String 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    deletedOn: { 
        type: Date
    },
    modifiedOn: { 
        type: Date
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'modifiedOn'
    }
});

export const Content = mongoose.model('Content', ContentSchema);