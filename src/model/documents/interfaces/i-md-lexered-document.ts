'use strict';

import { IDocumentPaths } from './i-document-paths';
import { TokensList } from 'marked';

export interface IMdLexeredDocument {
    documentPaths: IDocumentPaths;
    tokensList: TokensList;
    fmMetaData?: object;
}
