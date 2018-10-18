'use strict';

import { TokensList } from 'marked';
import { IDocumentPaths, IMdParsedDocument } from '../interfaces';

export class MdParsedDocument implements IMdParsedDocument {
    public static createMdParsedDocument(parsedDocument: IMdParsedDocument): MdParsedDocument {
        return new MdParsedDocument(parsedDocument);
    }

    public documentPaths: IDocumentPaths;
    public parsedTokensList: TokensList;
    public fmMetaData?: object;

    protected constructor(parsedDocument: IMdParsedDocument) {
        this.documentPaths = parsedDocument.documentPaths;
        this.parsedTokensList = parsedDocument.parsedTokensList;
        this.fmMetaData = parsedDocument.fmMetaData || null;
    }
}
