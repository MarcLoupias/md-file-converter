'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const default_impl_1 = require("../../documents/default-impl");
function parseLexeredDocument(mdLexeredDocument) {
    return default_impl_1.MdParsedDocument.createMdParsedDocument({
        documentPaths: default_impl_1.DocumentPaths.createDocumentPaths({ ...mdLexeredDocument.documentPaths }),
        parsedTokensList: mdLexeredDocument.tokensList,
        fmMetaData: mdLexeredDocument.fmMetaData
    });
}
exports.parseLexeredDocument = parseLexeredDocument;
