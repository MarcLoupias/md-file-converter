'use strict';

import { MarkedOptions } from 'marked';
import { DocumentPaths, MdParsedDocument, TargetDocument } from '../../documents/default-impl';
import { MapParsedDocumentFnType, UnConfiguredMapParsedDocumentFnType } from '../types';

export function makeUnConfiguredMapParsedDocument(deps: { marked: any }): UnConfiguredMapParsedDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): MapParsedDocumentFnType => {
        return (mdParsedDocument: MdParsedDocument): TargetDocument => {
            return TargetDocument.createTargetDocument({
                documentPaths: DocumentPaths.createDocumentPaths({...mdParsedDocument.documentPaths}),
                transformedData: deps.marked.parser(mdParsedDocument.parsedTokensList, conf.markedOptions),
                fmMetaData: mdParsedDocument.fmMetaData
            });
        }
    }
}
