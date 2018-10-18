'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function makeInterpretGlob(deps) {
    return (globPattern) => {
        const mdFileExtensionRegex = new RegExp(/md$/);
        if (!mdFileExtensionRegex.test(globPattern)) {
            deps.cliLogger.logErrorFulfilledGlobPatternMustCatchMdFilesOnly(globPattern);
            process.exitCode = 1;
            throw new Error(`The fulfilled pattern must catch .md files only : ${globPattern}.`);
        }
        const filePathList = deps.globSync(globPattern);
        if (!filePathList.length) {
            deps.cliLogger.logErrorNoFilesForFulfilledGlobPattern(globPattern);
            process.exitCode = 1;
            throw new Error(`No matching files for the fulfilled pattern ${globPattern}.`);
        }
        deps.cliLogger.logFilesListToProcess(filePathList);
        return filePathList;
    };
}
exports.makeInterpretGlob = makeInterpretGlob;
