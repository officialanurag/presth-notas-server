export interface IContentRequest {
    userId: string;
    pageId: string;
}

export interface IContentStoreRequest extends IContentRequest {
    text: string;
}

export interface IContentResponse {
    userId: string;
    text: string;
    modifiedOn: Date;
}