'use strict';

/* tslint:disable:no-console */

import { TargetDocument } from '../model/documents/default-impl';
import { PackageJson } from 'package-json';
import { IReducerConf } from '../model/action-convert/types';

export interface ICliLogger {
    logHeader(): void;
    logFilesListToProcess(filesList: string[]): void;
    logBeforeConfig(): void;
    logAfterConfig(): void;
    logBeforeProcessingFiles(): void;
    logProcessedFile(dest: string): void;
    logAfterProcessingFiles(): void;
    logErrorNoImplForTheGivenImplPkgPath(implPkgPath: string): void;
    logErrorFulfilledGlobPatternMustCatchMdFilesOnly(globPattern: string): void;
    logErrorNoFilesForFulfilledGlobPattern(globPattern: string): void;
    logErrorDuringActionFunction(e: Error): void;
    logBeforeReduce(reducerConf: IReducerConf): void;
}

export class CliLogger implements ICliLogger {
    public static makeCliLogger(deps: { pkg: PackageJson, console: Console }): CliLogger {
        return new CliLogger(deps);
    }

    private pkg: PackageJson;
    private console: Console;

    private constructor(deps: { pkg: PackageJson, console: Console }) {
        this.pkg = deps.pkg;
        this.console = deps.console;
    }

    public logHeader(): void {
        const cliTitle = `=== ${this.pkg.name} - version ${this.pkg.version} ===`;

        this.console.log('');
        this.console.log('='.repeat(cliTitle.length));
        this.console.log(cliTitle);
        this.console.log('='.repeat(cliTitle.length));
        this.console.log('');
        this.console.log(`"${this.pkg.description}"`);
        this.console.log('');
    }

    public logFilesListToProcess(filesList: string[]): void {
        this.console.log('Files to process : ');
        this.console.table(filesList);
        this.console.log('');
    }

    public logBeforeConfig(): void {
        this.console.log('Configuration ...');
    }

    public logAfterConfig(): void {
        this.console.log('Configuration done.');
        this.console.log('');
    }

    public logBeforeProcessingFiles(): void {
        this.console.log('Processing files ...');
        this.console.log('');
    }

    public logProcessedFile(dest: string): void {
        this.console.log(`${dest}`);
    }

    public logAfterProcessingFiles(): void {
        this.console.log('');
        this.console.log('Processing files done.');
        this.console.log('');
    }

    public logErrorNoImplForTheGivenImplPkgPath(implPkgPath: string): void {
        this.console.error(`No implementation package found for the given path ${implPkgPath}.`);
    }

    public logErrorFulfilledGlobPatternMustCatchMdFilesOnly(globPattern: string): void {
        this.console.error(`The fulfilled pattern must catch .md files only : ${globPattern}.`);
    }

    public logErrorNoFilesForFulfilledGlobPattern(globPattern: string): void {
        this.console.error(`No matching files for the fulfilled pattern ${globPattern}.`);
    }

    public logErrorDuringActionFunction(e: Error): void {
        this.console.error(e);
    }

    public logBeforeReduce(reducerConf: IReducerConf): void {
        this.console.log('Files to reduce :');
        this.console.table(reducerConf.arr.map((documentToReduce: TargetDocument) => {
            return {
                basename: documentToReduce.documentPaths.basename,
                src: documentToReduce.documentPaths.src
            };
        }));
        this.console.log('');
        this.console.log('Files reduced :');
        this.console.table(reducerConf.initialValue.map((reducedDocument: TargetDocument) => {
            return {
                dest: reducedDocument.documentPaths.dest
            };
        }));
    }
}
