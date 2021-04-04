export interface NotasContent {
    readonly _id: string;
    readonly userId: string;
    readonly content?: string;
    readonly text: string;
    readonly createdOn: Date;
    readonly modifiedOn: Date;
}