import { IRequest } from '../dto';
import { IChannelType, IResponse } from '../../app/main.interface';
import { ContentCore, IContentRequest, IContentResponse, IContentStoreRequest } from '../../../lib/core/operations/content';
import { NotFoundPromise } from '../../../lib/errors';
import { ContentEnum } from './content.enums';

class Content {
    private readonly channel: string = 'content';
    private contentCore: ContentCore = ContentCore.getInstance();

    private register = {
        [ContentEnum.FETCH_CONTENT]: (payload: IContentRequest) => this.fetchContent(payload),
        [ContentEnum.WRITE_CONTENT]: (payload: IContentStoreRequest) => this.storeContent(payload)
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
     * @param payload { IContentRequest }
     */
    private async fetchContent (payload: IContentRequest): Promise<any> {
        return await this.contentCore.fetchContent(payload);
    }

    /**
     * Socket route for channel
     * @param payload { IContentStoreRequest }
     */
    private async storeContent (payload: IContentStoreRequest): Promise<any> {
        return await this.contentCore.writeContent(payload);
    }
}

export const ContentChannel: IChannelType = {
    channelName: 'content',
    channelInstance: new Content()
};