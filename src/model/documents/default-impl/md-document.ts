'use strict';

import { IDocumentPaths, IMdDocument } from '../interfaces';

export class MdDocument implements IMdDocument {
    public static createMdDocument(mdDocument: IMdDocument): MdDocument {
        return new MdDocument(mdDocument);
    }

    public documentPaths: IDocumentPaths;
    public mdData: string;
    public fmMetaData?: object;

    protected constructor(mdDocument: IMdDocument) {
        this.documentPaths = mdDocument.documentPaths;
        this.mdData = mdDocument.mdData;
        this.fmMetaData = mdDocument.fmMetaData || null;
    }
}
