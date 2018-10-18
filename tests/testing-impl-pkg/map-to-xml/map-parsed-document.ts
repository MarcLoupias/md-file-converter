'use strict';

import { IMdParsedDocument, ITargetDocument } from './model/documents/interfaces';
import { TargetDocument } from './model/documents/default-impl';
import { UnConfiguredMapParsedDocumentFnType, MapParsedDocumentFnType } from './model/action-convert/types';
import { MdParsedDocumentImpl, TargetDocumentImpl } from './model-impl';
import { MarkedOptions } from 'marked';
import { FmQa } from './model-impl/front-matter';

export function makeUnConfiguredMapParsedDocument({ marked }: any): UnConfiguredMapParsedDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): MapParsedDocumentFnType => {
        return (mdParsedDocument: IMdParsedDocument): ITargetDocument => {
            function parseWithMarked(tokens: any) {
                tokens.links = Object.create(null); // pour fix erreur levée ici https://github.com/markedjs/marked/blob/master/lib/marked.js#L642
                return marked.parser(tokens, conf.markedOptions);
            }

            if (mdParsedDocument.documentPaths.basename === 'SUMMARY') {
                const content = marked.parser(mdParsedDocument.parsedTokensList, conf.markedOptions);

                return TargetDocument.createTargetDocument({
                    documentPaths: mdParsedDocument.documentPaths,
                    transformedData: `<?xml version="1.0" encoding="UTF-8"?><document>${content}</document>`,
                    fmMetaData: mdParsedDocument.fmMetaData
                });

            } else {
                const mdParsedDocumentImpl = mdParsedDocument as MdParsedDocumentImpl;
                const qaFmMetaData = mdParsedDocumentImpl.fmMetaData as FmQa;

                const qaContent = parseWithMarked(mdParsedDocumentImpl.parsedTokensList);
                const questionTitle = parseWithMarked(mdParsedDocumentImpl.questionTitleToken);
                const transformedData = `<?xml version="1.0" encoding="UTF-8"?><document><QA create_date="${qaFmMetaData.getCreateDate()}" last_update="${qaFmMetaData.getLastUpdateDate()}" name="${mdParsedDocumentImpl.documentPaths.basename}">${questionTitle}<author name="${qaFmMetaData.author}"/><keywords>${qaFmMetaData.keywords}</keywords><answer>${qaContent}</answer></QA></document>`;

                return TargetDocumentImpl.createTargetDocumentImpl(
                    TargetDocument.createTargetDocument({
                        documentPaths: mdParsedDocumentImpl.documentPaths,
                        transformedData,
                        fmMetaData: mdParsedDocumentImpl.fmMetaData
                    }),
                    mdParsedDocumentImpl.documentPaths.basename,
                    parseWithMarked(mdParsedDocumentImpl.sectionTitleToken)
                );
            }
        };
    };
}
