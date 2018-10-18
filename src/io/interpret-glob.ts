'use strict';

import { CliLogger } from './cli-logger';
import { IOptions } from 'glob';

type globSyncFnType = (pattern: string, options?: IOptions) => string[];

export type InterpretGlobFnType = (globPattern: string) => string[];

export function makeInterpretGlob(deps: { globSync: globSyncFnType, cliLogger: CliLogger, process: any }): InterpretGlobFnType {
    return (globPattern: string): string[] => {
        const mdFileExtensionRegex = new RegExp(/md$/);
        if (!mdFileExtensionRegex.test(globPattern)) {
            deps.cliLogger.logErrorFulfilledGlobPatternMustCatchMdFilesOnly(globPattern);
            process.exitCode = 1;
            throw new Error(`The fulfilled pattern must catch .md files only : ${globPattern}.`);
        }

        const filePathList: string[] = deps.globSync(globPattern);
        if (!filePathList.length) {
            deps.cliLogger.logErrorNoFilesForFulfilledGlobPattern(globPattern);
            process.exitCode = 1;
            throw new Error(`No matching files for the fulfilled pattern ${globPattern}.`);
        }

        deps.cliLogger.logFilesListToProcess(filePathList);

        return filePathList;
    };
}
