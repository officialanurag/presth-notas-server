import { Content } from './schemas';
import { NotasContent } from './model';
import { TakeCare } from '../helpers';

export class ContentRepository {
    public static instance: ContentRepository;

    private constructor() { }

    public static getInstance(): ContentRepository {
        if (!ContentRepository.instance) {
            ContentRepository.instance = new ContentRepository();
        }
        return ContentRepository.instance;
    }
    
    @TakeCare()
    public async getText (userId: string): Promise<NotasContent> {
        let query = { userId: userId };
        let project = {};
    
        return await Content.findOne(query, project) as any;
    }

    @TakeCare()
    public async writeText (userId: string, text: string): Promise<NotasContent> {
        const filter = { userId: userId };
        const update = { text: text };
        const config = { upsert: true };

        return await Content.findOneAndUpdate(filter, update, config) as any;
    }

}