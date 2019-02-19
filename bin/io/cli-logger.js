'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class CliLogger {
    static makeCliLogger(deps) {
        return new CliLogger(deps);
    }
    constructor(deps) {
        this.pkg = deps.pkg;
        this.console = deps.console;
    }
    logHeader() {
        const cliTitle = `=== ${this.pkg.name} - version ${this.pkg.version} ===`;
        this.console.log('');
        this.console.log('='.repeat(cliTitle.length));
        this.console.log(cliTitle);
        this.console.log('='.repeat(cliTitle.length));
        this.console.log('');
        this.console.log(`"${this.pkg.description}"`);
        this.console.log('');
    }
    logFilesListToProcess(filesList) {
        this.console.log('Files to process : ');
        this.console.table(filesList);
        this.console.log('');
    }
    logBeforeConfig() {
        this.console.log('Configuration ...');
    }
    logAfterConfig() {
        this.console.log('Configuration done.');
        this.console.log('');
    }
    logBeforeProcessingFiles() {
        this.console.log('Processing files ...');
        this.console.log('');
    }
    logProcessedFile(dest) {
        this.console.log(`${dest}`);
    }
    logAfterProcessingFiles() {
        this.console.log('');
        this.console.log('Processing files done.');
        this.console.log('');
    }
    logErrorNoImplForTheGivenImplPkgPath(implPkgPath) {
        this.console.error(`No implementation package found for the given path ${implPkgPath}.`);
    }
    logErrorNoMarkedOptionsFileForTheGivenPath(markedOptionsPath) {
        this.console.error(`No marked options file found for the given path ${markedOptionsPath}.`);
    }
    logErrorFulfilledGlobPatternMustCatchMdFilesOnly(globPattern) {
        this.console.error(`The fulfilled pattern must catch .md files only : ${globPattern}.`);
    }
    logErrorNoFilesForFulfilledGlobPattern(globPattern) {
        this.console.error(`No matching files for the fulfilled pattern ${globPattern}.`);
    }
    logErrorDuringActionFunction(e) {
        this.console.error(e);
    }
    logBeforeReduce(reducerConf) {
        this.console.log('Files to reduce :');
        this.console.table(reducerConf.arr.map((documentToReduce) => {
            return {
                basename: documentToReduce.documentPaths.basename,
                src: documentToReduce.documentPaths.src
            };
        }));
        this.console.log('');
        this.console.log('Files reduced :');
        this.console.table(reducerConf.initialValue.map((reducedDocument) => {
            return {
                dest: reducedDocument.documentPaths.dest
            };
        }));
    }
}
exports.CliLogger = CliLogger;
