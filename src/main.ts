import { AppMain } from './app';
import { EventEmitter } from 'events';
import { ContentChannel } from './channels/content';
import { PageChannel } from './channels/page';

global['EVENT_EMITTER'] = new EventEmitter();;

const application = new AppMain({
    port: parseInt(process.env.PORT),
    wsPort: parseInt(process.env.WS_PORT),
    host: process.env.HOST,
    dbUri: process.env.DB_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: parseInt(process.env.REDIS_PORT),
    useRedis: false,
    middlewares: [],
    channels: [
        ContentChannel,
        PageChannel
    ]
});

application.listen();