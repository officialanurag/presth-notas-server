import { IAddress } from '../../core/operations/common/interface'

export interface AddUser {
    name: string;
    email: string;
    password: string;
    areTermsAndConditionsAccepted: boolean;
}

export interface UserResponse {
    status: boolean;
    message?: string;
    userId?: string;
    name?: string;
}

export interface GetUser  {
    email?: string,
    password?: string
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdOn: Date;
    modifiedOn: Date;
}