'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class FilesHelper {
    static makeFilesHelper(deps) {
        return new FilesHelper(deps);
    }
    constructor(deps) {
        this.process = deps.process;
        this.debug = deps.debug;
        this.promises = deps.promises;
    }
    async readFile(src) {
        this.debug('readFile : src = %s', src);
        let rawData;
        try {
            rawData = await this.promises.readFile(src, { encoding: 'utf-8' });
        }
        catch (e) {
            this.process.exitCode = 1;
            throw new Error(e);
        }
        this.debug('readFile : data read is \n%s', rawData);
        return rawData;
    }
    async writeFile(dest, data) {
        this.debug('writeFile : dest = %s', dest);
        try {
            await this.promises.writeFile(dest, data);
        }
        catch (e) {
            this.process.exitCode = 1;
            throw new Error(e);
        }
        this.debug('writeFile : %s is written', dest);
    }
}
exports.FilesHelper = FilesHelper;
