import { User } from './schemas';
import { AddUser, GetUser } from './model/user.model';
import { TakeCare } from '../helpers';
import mongoose from 'mongoose';

export class UserRepository {
    public static instance: UserRepository;

    private constructor() { }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }
    
    @TakeCare()
    public async addUser (payload: AddUser): Promise<any> {
        const user = new User(payload);
        return await user.save();
    }

    @TakeCare()
    public async getUser (payload: GetUser): Promise<any> {
        return await User.findOne({email: payload.email});
    }
}