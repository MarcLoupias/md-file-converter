'use strict';

export class FmSummaryEditeur {
    public edversion: string;
    public edtypexml: number;

    public constructor({ edversion, edtypexml }: any) {
        this.edversion = edversion;
        this.edtypexml = edtypexml;
    }
}
