'use strict';

import { IDocumentPaths } from './i-document-paths';
import { TokensList } from 'marked';

export interface IMdParsedDocument {
    documentPaths: IDocumentPaths;
    parsedTokensList: TokensList;
    fmMetaData?: object;
}
