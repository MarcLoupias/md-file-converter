'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MdDocument {
    static createMdDocument(mdDocument) {
        return new MdDocument(mdDocument);
    }
    constructor(mdDocument) {
        this.documentPaths = mdDocument.documentPaths;
        this.mdData = mdDocument.mdData;
        this.fmMetaData = mdDocument.fmMetaData || null;
    }
}
exports.MdDocument = MdDocument;
