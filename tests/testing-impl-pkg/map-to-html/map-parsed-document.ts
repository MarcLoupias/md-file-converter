'use strict';

import { MdParsedDocument, TargetDocument } from './model/documents/default-impl';
import { MarkedOptions } from 'marked';
import { MapParsedDocumentFnType, UnConfiguredMapParsedDocumentFnType } from './model/action-convert/types';

export function makeUnConfiguredMapParsedDocument({ marked }: any): UnConfiguredMapParsedDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): MapParsedDocumentFnType => {
        return (mdParsedDocument: MdParsedDocument): TargetDocument => {
            const htmlBody = marked.parser(mdParsedDocument.parsedTokensList, conf.markedOptions);

            return TargetDocument.createTargetDocument({
                documentPaths: mdParsedDocument.documentPaths,
                transformedData: `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${mdParsedDocument.documentPaths.basename}</title></head><body>${htmlBody}</body></html>`,
                fmMetaData: mdParsedDocument.fmMetaData
            });
        };
    };
}
