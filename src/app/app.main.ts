import express, { Application } from 'express';
import { join } from 'path';
import { IMain, IMiddleware } from './main.interface';
import { SocketService } from './socket';
import { MongoDBDatabase, RedisDB } from './database';
import { IndividualUserClient } from './../../lib/core/clients/individuals';

export class AppMain extends SocketService {
    private application: Application;
    private applicationPort: number;
    private host: string;
    private dbUri: string;
    private sPort: number;
    private rHost: string;
    private rPort: number;
    private useRedis: boolean;
    private readonly mongoDB: MongoDBDatabase = new MongoDBDatabase();
    private readonly redisDB: RedisDB = new RedisDB();
    private readonly individualUser: IndividualUserClient = IndividualUserClient.getInstance();

    constructor(main: IMain) {
        super(main.wsPort, main.channels);
        this.application = express();
        this.applicationPort = main.port;
        this.host = main.host;
        this.dbUri = main.dbUri;
        this.sPort = main.wsPort;
        this.rHost = main.redisHost;
        this.rPort = main.redisPort;
        this.useRedis = main.useRedis;

        this.middlewares(main.middlewares);
        this.initiateDatabase();   
    }

    private middlewares(middleWares: IMiddleware) {
        middleWares.forEach(middleWare => {
            this.application.use(middleWare)
        });
    }

    private async initiateDatabase() {
        const mongoResponse = await this.mongoDB.connect(this.dbUri);
        
        if (this.useRedis) {
            const redisResponse = await this.redisDB.connect(this.rHost, this.rPort);
            global['REDIS_CONN'] = redisResponse;
        }
        
        console.log(mongoResponse)
    }

    public listen() {
        this.application.get('/', (req, res) => {
            res.status(403).send('<pre><h2>FORBIDDEN</h2></pre>')
        });

        this.application.listen(
            this.applicationPort,
            () => console.table([
                {
                    Service: 'WS Service',
                    URL: `http://${this.host}:${this.sPort}`
                }
            ])
        );
    }
}