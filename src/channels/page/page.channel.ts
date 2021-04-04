import { IRequest } from '../dto';
import { IChannelType, IResponse } from '../../app/main.interface';
import { IDeletePage, IPageRequest, IPageResponse, ISetActive, IUserPages, PageCore } from '../../../lib/core/operations/page';
import { NotFoundPromise } from '../../../lib/errors';
import { PageEnum } from './page.enum';
import { DeletePage, SetPageActive } from '../../../lib/repository/model';

class Page {
    private readonly channel: string = 'page';
    private pageCore: PageCore = PageCore.getInstance();

    private register = {
        [PageEnum.ADD_PAGE]: (payload: IPageRequest) => this.addPage(payload),
        [PageEnum.GET_PAGES]: (payload: IUserPages) => this.getPages(payload),
        [PageEnum.SET_CURRENT_PAGE]: (payload: ISetActive) => this.setCurrentPage(payload),
        [PageEnum.REMOVE_PAGE]: (payload: IDeletePage) => this.removePage(payload)
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
     * @param payload { IPageRequest }
     */
    private async addPage (payload: IPageRequest): Promise<IPageResponse> {
        const addPageResponse = await this.pageCore.addPage(payload);
        addPageResponse.localPageId = payload.localPageId;
        return addPageResponse;
    }

    /**
     * Socket route for channel
     * @param payload { IUserPages }
     */
    private async getPages (payload: IUserPages): Promise<IPageResponse[]> {
        return await this.pageCore.getAllPages(payload);
    }

    /**
     * Socket route for channel
     * @param payload { ISetActive }
     */
    private async setCurrentPage (payload: ISetActive): Promise<SetPageActive> {
        return await this.pageCore.setActive(payload);
    }

    /**
     * Socket route for channel
     * @param payload { IDeletePage }
     */
    private async removePage (payload: IDeletePage): Promise<DeletePage> {
        return await this.pageCore.deletePage(payload);
    }
}

export const PageChannel: IChannelType = {
    channelName: 'page',
    channelInstance: new Page()
};