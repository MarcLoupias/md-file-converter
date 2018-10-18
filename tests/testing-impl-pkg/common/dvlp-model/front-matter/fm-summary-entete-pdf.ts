'use strict';

export class FmSummaryEntetePdf {
    public sautDePageAvantSection: number;
    public notesBasPage: string;

    public constructor({ sautDePageAvantSection, notesBasPage }: any) {
        this.sautDePageAvantSection = sautDePageAvantSection;
        this.notesBasPage = notesBasPage;
    }
}
