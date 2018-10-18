'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function makeWriteTargetDocument(deps) {
    return async (targetDocument) => {
        deps.cliLogger.logProcessedFile(targetDocument.documentPaths.dest);
        await deps.filesHelper.writeFile(targetDocument.documentPaths.dest, targetDocument.transformedData);
        return targetDocument;
    };
}
exports.makeWriteTargetDocument = makeWriteTargetDocument;
