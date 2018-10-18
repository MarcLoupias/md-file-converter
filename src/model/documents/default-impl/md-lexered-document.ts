'use strict';

import { TokensList } from 'marked';
import { IDocumentPaths, IMdLexeredDocument } from '../interfaces';

export class MdLexeredDocument implements IMdLexeredDocument {
    public static createMdLexeredDocument(lexeredDocument: IMdLexeredDocument): MdLexeredDocument {
        return new MdLexeredDocument(lexeredDocument);
    }

    public documentPaths: IDocumentPaths;
    public tokensList: TokensList;
    public fmMetaData?: object;

    protected constructor(lexeredDocument: IMdLexeredDocument) {
        this.documentPaths = lexeredDocument.documentPaths;
        this.tokensList = lexeredDocument.tokensList;
        this.fmMetaData = lexeredDocument.fmMetaData || null;
    }
}
