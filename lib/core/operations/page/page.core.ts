import { IDeletePage, IPageRequest, IPageResponse, ISetActive, IUserPages } from "./page.interface";
import { PageRepository } from './../../../repository';
import { NotasPage } from "../../../repository/model";

export class PageCore {
    public static instance: PageCore;
    private readonly pageRepository: PageRepository = PageRepository.getInstance();

    private constructor() { }

    public static getInstance(): PageCore {
        if (!PageCore.instance) {
            PageCore.instance = new PageCore();
        }
        return PageCore.instance;
    }

    public async addPage(payload: IPageRequest) {
        const fetchContentResponse: NotasPage = await this.pageRepository.createPage(payload.userId, payload.pageTitle, payload.localPageId); 
        return this.translator(fetchContentResponse);
    }

    public async getAllPages(payload: IUserPages) {
        const fetchContentResponse: NotasPage[] = await this.pageRepository.fetchPages(payload.userId); 
        return this.translateArray(fetchContentResponse);
    }

    public async setActive(payload: ISetActive) {
        return await this.pageRepository.setActivePage(payload.userId, payload.pageId); 
    }

    public async deletePage(payload: IDeletePage) {
        return await this.pageRepository.deletePage(payload.userId, payload.pageId); 
    }

    private translator(page: NotasPage): IPageResponse {
        return {
            userId: page.userId,
            pageId: page._id,
            pageTitle: page.pageTitle,
            isActive: page.isActive,
            modifiedOn: page.modifiedOn
        }
    }

    private translateArray(page: NotasPage[]): IPageResponse[] {
        return page.map(_page => {
            return {
                userId: _page.userId,
                pageId: _page._id,
                pageTitle: _page.pageTitle,
                isActive: _page.isActive,
                modifiedOn: _page.modifiedOn
            }
        })
    }
}