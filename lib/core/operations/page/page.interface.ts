export interface IPageRequest {
    userId: string;
    localPageId?: string;
    pageTitle: string;
}

export interface IPageResponse {
    userId: string;
    localPageId?: string;
    pageId: string;
    pageTitle: string;
    isActive: boolean;
    modifiedOn: Date;
}

export interface IUserPages {
    userId: string;
}

export interface ISetActive extends IUserPages {
    pageId: string;
}

export interface IDeletePage extends ISetActive {}