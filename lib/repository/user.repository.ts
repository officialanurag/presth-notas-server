import { User } from './schemas';
import { AddUser } from './model/user.model';

export class UserRepository {
    
    async addUser (payload: AddUser): Promise<any> {
        const user = new User(payload);
        return await user.save();
    }

}