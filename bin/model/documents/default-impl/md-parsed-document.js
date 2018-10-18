'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MdParsedDocument {
    static createMdParsedDocument(parsedDocument) {
        return new MdParsedDocument(parsedDocument);
    }
    constructor(parsedDocument) {
        this.documentPaths = parsedDocument.documentPaths;
        this.parsedTokensList = parsedDocument.parsedTokensList;
        this.fmMetaData = parsedDocument.fmMetaData || null;
    }
}
exports.MdParsedDocument = MdParsedDocument;
