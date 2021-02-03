import { IAddress } from '../../core/operations/common/interface'

export interface User {   
    companyName: string;
    spocs: string;
    contact: string;
    address: IAddress;
    other: any;
}

export interface AddUser extends User {}

export interface UserResponse extends User {
    _id: string,
    createdOn: Date,
    deletedOn: Date,
    modifiedOn: Date
}