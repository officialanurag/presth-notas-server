import { IContentRequest, IContentResponse, IContentStoreRequest } from "./content.interface";
import { ContentRepository } from './../../../repository';
import { NotasContent } from "../../../repository/model";

export class ContentCore {
    public static instance: ContentCore;
    private readonly contentRepository: ContentRepository = ContentRepository.getInstance();

    private constructor() { }

    public static getInstance(): ContentCore {
        if (!ContentCore.instance) {
            ContentCore.instance = new ContentCore();
        }
        return ContentCore.instance;
    }

    public async fetchContent(payload: IContentRequest) {
        const fetchContentResponse: NotasContent = await this.contentRepository.getText(payload.userId, payload.pageId); 
        if (fetchContentResponse) {
            return this.translator(fetchContentResponse);
        } else {
            return {
                userId: payload.userId,
                text: '',
                modifiedOn: null
            };
        }
    }

    public async writeContent(payload: IContentStoreRequest) {
        const writeContentResponse: NotasContent = await this.contentRepository.writeText(payload.userId, payload.pageId, payload.text);
        console.log(writeContentResponse)
        return this.translator(writeContentResponse);
    }

    private translator(content: NotasContent): IContentResponse {
        return {
            userId: content.userId,
            text: content.text,
            modifiedOn: content.modifiedOn
        }
    }
}