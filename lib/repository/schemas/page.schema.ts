import mongoose, { Schema } from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const PageSchema: Schema = new Schema({
    userId: {
        type: String
    },
    pageTitle: { 
        type: String 
    },
    content: {
        type: ObjectId
    },
    isActive: {
        type: Boolean
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    deleted: {
        type: Boolean,
        default: false
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

export const Page = mongoose.model('Page', PageSchema);