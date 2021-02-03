export interface IContentRequest {
    userId: string;
}

export interface IContentStoreRequest extends IContentRequest {
    text: string;
}

export interface IContentResponse {
    userId: string;
    text: string;
    modifiedOn: Date;
}