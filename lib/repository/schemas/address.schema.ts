import mongoose, { Schema } from 'mongoose';

export const AddressSchema: Schema = new Schema({
    _id: {
        type: String
    },
    addressLine1: {
        type: String
    },
    addressLine2: { 
        type: String 
    },
    cityOrTown: { 
        type: String 
    },
    state: { 
        type: Object,         
    },
    area: {
        type: String
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    }
});