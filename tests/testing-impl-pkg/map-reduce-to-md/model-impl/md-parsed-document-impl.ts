'use strict';

import { TokensList } from 'marked';
import { IDocumentPaths, IMdParsedDocument } from '../model/documents/interfaces';

export class MdParsedDocumentImpl implements IMdParsedDocument {
    public static createMdParsedDocumentImpl(parsedDocument: IMdParsedDocument, questionTitleToken: TokensList, sectionTitleToken: TokensList): MdParsedDocumentImpl {
        return new MdParsedDocumentImpl(parsedDocument, questionTitleToken, sectionTitleToken);
    }

    public documentPaths: IDocumentPaths;
    public parsedTokensList: TokensList;
    public fmMetaData?: object;
    public questionTitleToken: TokensList;
    public sectionTitleToken: TokensList;

    protected constructor(parsedDocument: IMdParsedDocument, questionTitleToken: TokensList, sectionTitleToken: TokensList) {
        this.documentPaths = parsedDocument.documentPaths;
        this.parsedTokensList = parsedDocument.parsedTokensList;
        this.fmMetaData = parsedDocument.fmMetaData || null;
        this.questionTitleToken = questionTitleToken;
        this.sectionTitleToken = sectionTitleToken;
    }
}
