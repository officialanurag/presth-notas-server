import * as WS from 'ws';
import { IChannel, IChannelType, IRequest, IResponse } from './../main.interface';
import { BadRequest, NotFound } from './../../../lib/errors';
import { readFileSync } from 'fs';
import { createServer, Server } from 'https';

export class SocketService {
    public webSocketPort: number;
    private connectionPool: {[key: string]: WS} = {};
    private logging: boolean = false;

    constructor(port: number, channels: IChannel) {
        this.webSocketPort = port;
        this.initiateWebSockets(channels);

        global['EVENT_EMITTER'].on('sendBlueCardMessage', (data) => {
            this.sendBlueCardMessage(data.userId, data.message)
        });
    }

    private createChannelsObject(channels: IChannel) {
        const associativeAccess = {};
        channels.forEach((channel: IChannelType) => {
            associativeAccess[channel.channelName] = channel.channelInstance;
        })

        return associativeAccess;
    }

    private validateRequest(_request: any) {    
        let response: IRequest;

        try {
            const data: IRequest = JSON.parse(_request);            
            response = {
                channel: data.channel,
                payload: data.payload,
                userId: data.userId
            }           
        } catch (e) {
            response = BadRequest('JSON request is invalid.')
        }

        return response;
    }

    private sendBlueCardMessage(userId: string, payload: any): void {
        if (this.doesUserExistInConnectionPool(userId)) {
            const ws = this.connectionPool[userId];
            ws.send(JSON.stringify(payload));
        }
    }

    private doesUserExistInConnectionPool(userId: string): boolean {
        return Object.keys(this.connectionPool).includes(userId);
    }

    private initiateWebSockets(channels: IChannel) {
        let _wss: any;
        let _server: Server;
        if (process.env.PLATFORM_ENV !== 'dev') {
            _server = createServer({
                cert: readFileSync('/etc/letsencrypt/live/pickiser.com/fullchain.pem'),
                key: readFileSync('/etc/letsencrypt/live/pickiser.com/privkey.pem')
            });
            _wss = new WS.Server({ _server });
        } else {
            _wss = new WS.Server({ port: this.webSocketPort });
        }
        
        const _associativeChannelAccess = this.createChannelsObject(channels);
        _wss.on('connection', (_ws: any) => {
            _ws.on('message', (data: any) => {
                if (this.logging)  {
                    console.time('request')
                }
                    
                const _request: IRequest = this.validateRequest(data);                
                if (_request.channel === 'Error') {
                    _ws.send(JSON.stringify({
                        channel: 'Error',
                        result: { ..._request.payload }
                    }));
                } 

                if (_request.channel !== 'Error' && _associativeChannelAccess[_request.channel]) {
                    this.connectionPool[_request.userId] = _ws;

                    const _response: Promise<IResponse> = _associativeChannelAccess[_request.channel].processRequest(_request.payload);                    
                    _response.then(
                        (data: any) => ({
                            channel: data.channel,
                            service: data.service,
                            result: data.result
                        })
                    ).then(
                        (data: any) => data.result.then(
                            (result: any) => ({
                                channel: data.channel,
                                service: data.service,
                                result: result
                            })
                        )
                    ).then(
                        (data: any) => {                            
                            _ws.send(JSON.stringify(data))
                            if (this.logging) {
                                console.timeEnd('request')
                            }
                        }
                    );
                } else {
                    _ws.send(JSON.stringify({
                        channel: 'Error',
                        result: { ...NotFound('Channel not found.') }
                    }))
                }                
            })
        });

        if (process.env.PLATFORM_ENV === 'prod') {
            _server.listen(this.webSocketPort);
        }
    }
}