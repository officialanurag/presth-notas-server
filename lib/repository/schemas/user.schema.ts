import mongoose, { Schema } from 'mongoose';
import { AddressSchema } from './address.schema';

const UserSchema: Schema = new Schema({
    companyName: {
        type: String
    },
    spocs: { 
        type: String 
    },
    contact: { 
        type: String 
    },
    address: { 
        type: AddressSchema,        
    },
    other: {
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

export const User = mongoose.model('User', UserSchema);