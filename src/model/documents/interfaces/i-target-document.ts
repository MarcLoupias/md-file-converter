'use strict';

import { IDocumentPaths } from './i-document-paths';

export interface ITargetDocument {
    documentPaths: IDocumentPaths;
    transformedData: string;
    fmMetaData?: object;
}
