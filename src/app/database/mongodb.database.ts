import mongoose from 'mongoose';

export class MongoDBDatabase {   
    private async initiateDatabase(connectionString: string) {
        return new Promise((resolve, reject) => {
            try {
                mongoose.connect(connectionString, {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }, () => {
                    resolve('DB Connected')
                })
            } catch (e) {
                reject(e.message);
            }            
        })
        
    }

    async connect(connStr: string) {
        return await this.initiateDatabase(connStr);
    }
}