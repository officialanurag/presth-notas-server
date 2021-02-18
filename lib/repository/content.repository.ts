import { Content, Page } from './schemas';
import { NotasContent } from './model';
import { TakeCare } from '../helpers';
import mongoose, { Types } from 'mongoose';

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
    public async getText (userId: string, pageId: string): Promise<NotasContent> {
        const aggresult = await Page.aggregate([
            {
                '$match': {
                    _id: mongoose.Types.ObjectId(pageId),
                    userId: userId
                }
            },
            {
                '$lookup': {
                    from: 'contents',
                    localField: 'content',
                    foreignField: '_id',
                    as: 'op'
                }
            },
            {
                '$project': {
                    op: 1
                }
            }
        ]);

        return aggresult[0].op[0];
    }

    // @TakeCare()
    public async writeText (userId: string, pageId: string, text: string): Promise<NotasContent> {
        const findPageResponse: NotasContent = await Page.findOne({_id: pageId, userId: userId}) as any;
        let contentId: string;

        if (!findPageResponse.content) {
            // Create new content
            const newContent = await this.createContent(userId, text);
            // Add contentId in page
            await Page.updateOne({_id: pageId, userId: userId}, {content: mongoose.Types.ObjectId(newContent._id)});

            return newContent;
        } else {
            contentId = findPageResponse.content;
            return await Content.findOneAndUpdate({userId: userId, _id: contentId}, {text: text}, {upsert: true}) as any;
        }
    }

    private async createContent (userId: string, text: string): Promise<NotasContent> {
        const content = new Content({ userId: userId, text: text });
        return await content.save() as any;
    }
}