'use strict';

import { IDocumentPaths } from './i-document-paths';

export interface IMdDocument {
    documentPaths: IDocumentPaths;
    mdData: string;
    fmMetaData?: object;
}
