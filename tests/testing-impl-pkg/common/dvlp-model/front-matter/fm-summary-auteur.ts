'use strict';

export class FmSummaryAuteur {
    public name: string;
    public fullname: string;
    public url: string;
    public role: string;

    public constructor({ name, fullname, url, role }: any) {
        this.name = name;
        this.fullname = fullname;
        this.url = url;
        this.role = role;
    }
}
