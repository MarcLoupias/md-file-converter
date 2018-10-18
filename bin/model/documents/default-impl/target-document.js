'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class TargetDocument {
    static createTargetDocument(targetDocument) {
        return new TargetDocument(targetDocument);
    }
    constructor(targetDocument) {
        this.documentPaths = targetDocument.documentPaths;
        this.transformedData = targetDocument.transformedData;
        this.fmMetaData = targetDocument.fmMetaData || null;
    }
}
exports.TargetDocument = TargetDocument;
