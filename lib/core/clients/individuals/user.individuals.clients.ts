import { AddUser, GetUser, User, UserResponse } from '../../../repository/model';
import { UserRepository } from './../../../repository/user.repository';
import md5 from 'md5';

export class IndividualUserClient {
    private static instance: IndividualUserClient;
    private userRepository: UserRepository = UserRepository.getInstance();

    private constructor() { }

    public static getInstance(): IndividualUserClient {
        if (!IndividualUserClient.instance) {
            IndividualUserClient.instance = new IndividualUserClient();
        }
        return IndividualUserClient.instance;
    }

    public async register(payload: AddUser): Promise<UserResponse> {
        if (!payload.areTermsAndConditionsAccepted) {
            return {
                status: false,
                message: 'TERMS_AND_CONDITION_NOT_SELECTED'
            };
        }

        const getUserResponse = await this.userRepository.getUser(payload);
        if (getUserResponse) {
            return {
                status: false,
                message: 'USER_EXISTS'
            }; 
        }

        payload.password = md5(payload.password);
        const user: User = await this.userRepository.addUser(payload);
        return this.translate(user, 'CREATED');
    }

    public async login(payload: GetUser): Promise<UserResponse> {
        const user: User = await this.userRepository.getUser(payload);
        if (user) {
            if (user.password === md5(payload.password)) {
                return this.translate(user, 'LOGIN_SUCCESS');
            }

            return {
                status: false,
                message: 'INVALID_PASSWORD'
            };
        }

        return {
            status: false,
            message: 'USER_NOT_EXISTS'
        };
    }

    public async doesUserExists(payload: GetUser): Promise<UserResponse> {
        const user: User = await this.userRepository.getUser(payload);
        if (user) {
            return this.translate(user, 'USER_EXISTS');
        }

        return {
            status: false,
            message: 'USER_NOT_EXISTS'
        };
    }

    private translate(user: User, msg: string): UserResponse {
        return {
            status: true,
            message: msg,
            userId: user.email,
            name: user.name
        };
    }
}