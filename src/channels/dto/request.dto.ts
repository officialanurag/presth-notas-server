export interface IRequest {
    service: string,
    payload: object
}

export interface IPage {
    page?: number;
    limit?: number;
}