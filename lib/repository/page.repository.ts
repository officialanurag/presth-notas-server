import { Page } from './schemas';
import { DeletePage, NotasPage, SetPageActive } from './model';
import { TakeCare } from '../helpers';
import { isValidObjectId } from 'mongoose';

export class PageRepository {
    public static instance: PageRepository;

    private constructor() { }

    public static getInstance(): PageRepository {
        if (!PageRepository.instance) {
            PageRepository.instance = new PageRepository();
        }
        return PageRepository.instance;
    }
    
    @TakeCare()
    public async createPage (userId:string, pageTitle: string, pageId: string): Promise<NotasPage> {
        if (isValidObjectId(pageId)) {
            await Page.updateOne({'userId': userId, '_id': pageId}, {'pageTitle': pageTitle}) as any;
            return await Page.findOne({'userId': userId, '_id': pageId}) as any;
        } else {
            return await Page.create({
                userId: userId,
                pageTitle: pageTitle,
                isActive: true
            }) as any;
        }
    }

    @TakeCare()
    public async fetchPages (userId:string): Promise<NotasPage[]> {
        return await Page.find({'userId': userId, 'deleted': false}) as any;
    }

    @TakeCare()
    public async setActivePage (userId:string, pageId: string): Promise<SetPageActive> {
        await Page.updateMany({'userId': userId}, {isActive: false});
        return await Page.updateOne({'userId': userId, '_id': pageId}, {isActive: true});
    }

    @TakeCare()
    public async deletePage (userId:string, pageId: string): Promise<DeletePage> {
        return await Page.updateOne({'userId': userId, '_id': pageId}, {deleted: true, deletedOn: new Date()});
    }
}