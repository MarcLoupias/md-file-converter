'use strict';

import { MarkedOptions } from 'marked';
import { DocumentPaths, MdDocument, MdLexeredDocument } from '../../documents/default-impl';
import { TokenizeMdDocumentFnType, UnConfiguredTokenizeMdDocumentFnType } from '../types';

export function makeUnConfiguredTokenizeMdDocument(deps: { marked: any }): UnConfiguredTokenizeMdDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): TokenizeMdDocumentFnType => {
        return (mdDocument: MdDocument): MdLexeredDocument => {
            return MdLexeredDocument.createMdLexeredDocument({
                documentPaths: DocumentPaths.createDocumentPaths({...mdDocument.documentPaths}),
                tokensList: deps.marked.lexer(mdDocument.mdData, conf.markedOptions),
                fmMetaData: mdDocument.fmMetaData
            });
        }
    }
}
