'use strict';

import { IDocumentPaths, ITargetDocument } from '../model/documents/interfaces';

export class ReducedTargetDocumentImpl implements ITargetDocument {
    public static createReducedTargetDocumentImpl(targetDocument: ITargetDocument, yamlAuthorList: string, mdSectionList: string): ReducedTargetDocumentImpl {
        return new ReducedTargetDocumentImpl(targetDocument, yamlAuthorList, mdSectionList)
    }

    public documentPaths: IDocumentPaths;
    public transformedData: string;
    public fmMetaData?: object;
    public yamlAuthorList: string;
    public mdSectionList: string;

    constructor(targetDocument: ITargetDocument, yamlAuthorList: string, mdSectionList: string) {
        this.documentPaths = targetDocument.documentPaths;
        this.transformedData = targetDocument.transformedData;
        this.fmMetaData = targetDocument.fmMetaData || null;
        this.yamlAuthorList = yamlAuthorList || '';
        this.mdSectionList = mdSectionList || '';
    }
}
