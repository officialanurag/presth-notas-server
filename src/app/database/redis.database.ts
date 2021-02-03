import redis from 'redis';

export class RedisDB {
    private async initiateDatabase(redisHost: string, redisPort: number) {
        return new Promise((resolve, reject) => {
            try {
                const redisConnection = redis.createClient({
                    port: redisPort,
                    host: redisHost
                });

                resolve(redisConnection);
            } catch (e) {
                reject(e.message);
            }            
        })
        
    }

    async connect(redisHost: string, redisPort: number) {
        return await this.initiateDatabase(redisHost, redisPort);
    }
}