'use strict';

export class FmSummaryEnteteTitre {
    public page: string;
    public article: string;

    public constructor({ page, article }: any) {
        this.page = page;
        this.article = article;
    }
}
