'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const default_impl_1 = require("../../documents/default-impl");
function makeUnConfiguredMapParsedDocument(deps) {
    return (conf) => {
        return (mdParsedDocument) => {
            return default_impl_1.TargetDocument.createTargetDocument({
                documentPaths: default_impl_1.DocumentPaths.createDocumentPaths({ ...mdParsedDocument.documentPaths }),
                transformedData: deps.marked.parser(mdParsedDocument.parsedTokensList, conf.markedOptions),
                fmMetaData: mdParsedDocument.fmMetaData
            });
        };
    };
}
exports.makeUnConfiguredMapParsedDocument = makeUnConfiguredMapParsedDocument;
