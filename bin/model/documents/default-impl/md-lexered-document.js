'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class MdLexeredDocument {
    static createMdLexeredDocument(lexeredDocument) {
        return new MdLexeredDocument(lexeredDocument);
    }
    constructor(lexeredDocument) {
        this.documentPaths = lexeredDocument.documentPaths;
        this.tokensList = lexeredDocument.tokensList;
        this.fmMetaData = lexeredDocument.fmMetaData || null;
    }
}
exports.MdLexeredDocument = MdLexeredDocument;
