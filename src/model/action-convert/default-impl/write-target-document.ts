'use strict';

import { TargetDocument } from '../../documents/default-impl';
import { FilesHelper } from '../../../io/files-helper';
import { CliLogger } from '../../../io/cli-logger';
import { WriteTargetDocumentFnType } from '../types';

export function makeWriteTargetDocument(deps: { filesHelper: FilesHelper, cliLogger: CliLogger }): WriteTargetDocumentFnType {
    return async (targetDocument: TargetDocument): Promise<TargetDocument> => {
        // don't execute after filesystem writing to get the right log order, will be print even if the I/O fails.
        deps.cliLogger.logProcessedFile(targetDocument.documentPaths.dest);
        await deps.filesHelper.writeFile(targetDocument.documentPaths.dest, targetDocument.transformedData);

        return targetDocument;
    }
}
