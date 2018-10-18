'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class DocumentPaths {
    static createDocumentPaths(documentPaths) {
        return new DocumentPaths(documentPaths);
    }
    constructor(documentPaths) {
        this.src = documentPaths.src;
        this.dest = documentPaths.dest;
        this.basename = documentPaths.basename;
    }
}
exports.DocumentPaths = DocumentPaths;
