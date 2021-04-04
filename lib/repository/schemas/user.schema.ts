import mongoose, { Schema } from 'mongoose';
import { AddressSchema } from './address.schema';

const UserSchema: Schema = new Schema({
    name: {
        type: String
    },
    email: { 
        type: String 
    },
    password: { 
        type: String 
    },
    areTermsAndConditionsAccepted: {
        type: Boolean
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

export const User = mongoose.model('User', UserSchema);