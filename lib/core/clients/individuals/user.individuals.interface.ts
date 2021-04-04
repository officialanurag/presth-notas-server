export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
    areTermsAndConditionsAccepted: boolean;
}

export interface IContentResponse {
    userId: string;
    name: string;
}

export interface ILoginRequest {
    email: string;
    password?: string;
}