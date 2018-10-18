'use strict';

import { IDocumentPaths, ITargetDocument } from '../model/documents/interfaces';

export class ReducedTargetDocumentImpl implements ITargetDocument {
    public static createReducedTargetDocumentImpl(targetDocument: ITargetDocument, xmlAuthorList: string, xmlSectionList: string, xmlQaList: string): ReducedTargetDocumentImpl {
        return new ReducedTargetDocumentImpl(targetDocument, xmlAuthorList, xmlSectionList, xmlQaList)
    }

    public documentPaths: IDocumentPaths;
    public transformedData: string;
    public fmMetaData?: object;
    public xmlAuthorList: string;
    public xmlSectionList: string;
    public xmlQaList: string;

    constructor(targetDocument: ITargetDocument, xmlAuthorList: string, xmlSectionList: string, xmlQaList: string) {
        this.documentPaths = targetDocument.documentPaths;
        this.transformedData = targetDocument.transformedData;
        this.fmMetaData = targetDocument.fmMetaData || null;
        this.xmlAuthorList = xmlAuthorList || '';
        this.xmlSectionList = xmlSectionList || '';
        this.xmlQaList = xmlQaList || '';
    }
}
