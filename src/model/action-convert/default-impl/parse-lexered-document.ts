'use strict';

import { DocumentPaths, MdLexeredDocument, MdParsedDocument } from '../../documents/default-impl';

export function parseLexeredDocument(mdLexeredDocument: MdLexeredDocument): MdParsedDocument {
    return MdParsedDocument.createMdParsedDocument({
        documentPaths: DocumentPaths.createDocumentPaths({...mdLexeredDocument.documentPaths}),
        parsedTokensList: mdLexeredDocument.tokensList,
        fmMetaData: mdLexeredDocument.fmMetaData
    });
}
