'use strict';

export class FmSummaryEnteteMeta {
    public description: string;
    public keywords: string;

    constructor({ description, keywords }: any) {
        this.description = description;
        this.keywords = keywords;
    }
}
