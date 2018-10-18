'use strict';

export class FmQa {
    protected createDate: string;
    protected lastUpdateDate: string;
    public author: string;
    public keywords: string;

    public constructor({ createDate, lastUpdateDate, author, keywords }: any) {
        this.setCreateDate(createDate);
        this.setLastUpdateDate(lastUpdateDate);
        this.author = author;
        this.keywords = keywords;
    }

    public setCreateDate(createDate: Date) {
        this.createDate = createDate.toISOString().slice(0,10);
    }

    public getCreateDate(): string {
        return this.createDate;
    }

    public setLastUpdateDate(lastUpdateDate: Date) {
        this.lastUpdateDate = lastUpdateDate.toISOString().slice(0,10);
    }

    public getLastUpdateDate(): string {
        return this.lastUpdateDate;
    }
}
