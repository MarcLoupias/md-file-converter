'use strict';

import { IDebugger } from 'debug';

export interface IFilesHelper {
    readFile(src: string): Promise<string>;
    writeFile(dest: string, data: string): Promise<void>;
}

export class FilesHelper implements IFilesHelper {
    public static makeFilesHelper(deps: { process: any, debug: IDebugger, promises: any }): FilesHelper {
        return new FilesHelper(deps);
    }

    private process: any;
    private debug: IDebugger;
    private promises: any;

    private constructor(deps: { process: any, debug: IDebugger, promises: any }) {
        this.process = deps.process;
        this.debug = deps.debug;
        this.promises = deps.promises;
    }

    public async readFile(src: string): Promise<string> {
        this.debug('readFile : src = %s', src);

        let rawData;

        try {
            rawData = await this.promises.readFile(src, { encoding: 'utf-8' });
        } catch (e) {
            this.process.exitCode = 1;
            throw new Error(e);
        }

        this.debug('readFile : data read is \n%s', rawData);

        return rawData;
    }

    public async writeFile(dest: string, data: string): Promise<void> {
        this.debug('writeFile : dest = %s', dest);

        try {
            await this.promises.writeFile(dest, data);
        } catch (e) {
            this.process.exitCode = 1;
            throw new Error(e);
        }

        this.debug('writeFile : %s is written', dest);
    }
}
