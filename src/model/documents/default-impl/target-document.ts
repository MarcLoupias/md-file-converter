'use strict';

import { IDocumentPaths, ITargetDocument } from '../interfaces';

export class TargetDocument implements ITargetDocument {
    public static createTargetDocument(targetDocument: ITargetDocument): TargetDocument {
        return new TargetDocument(targetDocument);
    }

    public documentPaths: IDocumentPaths;
    public transformedData: string;
    public fmMetaData?: object;

    protected constructor(targetDocument: ITargetDocument) {
        this.documentPaths = targetDocument.documentPaths;
        this.transformedData = targetDocument.transformedData;
        this.fmMetaData = targetDocument.fmMetaData || null;
    }
}
