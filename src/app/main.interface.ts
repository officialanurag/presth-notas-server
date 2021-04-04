export interface IMain {
    port: number;
    wsPort: number;
    host: string;
    dbUri: string;
    redisHost: string;
    redisPort: number;
    useRedis: boolean;
    middlewares: any;
    channels: any;
}

export interface IMiddleware {
    forEach: (arg0: (middleWare: any) => void) => void;
}

export interface IChannelType {
    channelName: string;
    channelInstance: any;
}

export interface IChannel {
    forEach: (arg0: (channel: IChannelType) => void) => void;
}

export interface IRequest {
    channel: string;
    payload: any;
    userId?: string;
    deviceType?: string;
}

export interface IResponse {
    channel: string;
    service: string;
    result: object;
}