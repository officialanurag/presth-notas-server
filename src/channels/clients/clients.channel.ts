import { IRequest } from '../dto';
import { IChannelType, IResponse } from '../../app/main.interface';
import { IndividualUserClient, ILoginRequest, IRegisterRequest } from '../../../lib/core/clients/individuals';
import { NotFoundPromise } from '../../../lib/errors';
import { ClientsEnum } from './clients.enums';

class Client {
    private readonly channel: string = 'client';
    private individualUserClient: IndividualUserClient = IndividualUserClient.getInstance();

    private register = {
        [ClientsEnum.AUTHENTICATE_USER]: (payload: ILoginRequest) => this.loginUser(payload),
        [ClientsEnum.REGISTER_USER]: (payload: IRegisterRequest) => this.regitserUser(payload),
        [ClientsEnum.CHECK_LOGGED_IN_USER]: (payload: ILoginRequest) => this.checkloggedInUser(payload)
    };

    async processRequest (request: IRequest): Promise<any> {
        if (this.register[request.service]) {
            const response: IResponse = {
                channel: this.channel,
                service: request.service,
                result: this.register[request.service](request.payload)
            }             
                                
            return response;
        } else {            
            return NotFoundPromise('Service not found.', this.channel);            
        }
    }

    /**
     * Socket route for channel
     * @param payload { IRegisterRequest }
     */
    private async regitserUser (payload: IRegisterRequest): Promise<any> {
        return await this.individualUserClient.register(payload);
    }

    /**
     * Socket route for channel
     * @param payload { ILoginRequest }
     */
    private async loginUser (payload: ILoginRequest): Promise<any> {
        return await this.individualUserClient.login(payload);
    }

    /**
     * Socket route for channel
     * @param payload { string }
     */
    private async checkloggedInUser (payload: ILoginRequest): Promise<any> {
        return await this.individualUserClient.doesUserExists(payload);
    }
}

export const ClientChannel: IChannelType = {
    channelName: 'client',
    channelInstance: new Client()
};