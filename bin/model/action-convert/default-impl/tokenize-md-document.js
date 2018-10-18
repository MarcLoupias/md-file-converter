'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const default_impl_1 = require("../../documents/default-impl");
function makeUnConfiguredTokenizeMdDocument(deps) {
    return (conf) => {
        return (mdDocument) => {
            return default_impl_1.MdLexeredDocument.createMdLexeredDocument({
                documentPaths: default_impl_1.DocumentPaths.createDocumentPaths({ ...mdDocument.documentPaths }),
                tokensList: deps.marked.lexer(mdDocument.mdData, conf.markedOptions),
                fmMetaData: mdDocument.fmMetaData
            });
        };
    };
}
exports.makeUnConfiguredTokenizeMdDocument = makeUnConfiguredTokenizeMdDocument;
