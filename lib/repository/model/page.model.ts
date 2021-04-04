export interface CommonPage {
    readonly _id: string;
    readonly userId: string;
    readonly pageTitle: string;
    readonly isActive: boolean;
    readonly modifiedOn: Date;
}

export interface NotasPage extends CommonPage {
    readonly content: string;
    readonly createdOn: Date;
}

export interface SetPageActive extends CommonPage {}

export interface DeletePage extends CommonPage {}