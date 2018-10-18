'use strict';

import { UnConfiguredMapParsedDocumentFnType, MapParsedDocumentFnType } from './model/action-convert/types';
import { ITargetDocument } from './model/documents/interfaces';
import { MdParsedDocument, TargetDocument } from './model/documents/default-impl';
import { MdParsedDocumentImpl, TargetDocumentImpl } from './model-impl';
import { MarkedOptions } from 'marked';
import { FmQa } from './model-impl/front-matter';

export function makeUnConfiguredMapParsedDocument({ marked }: any): UnConfiguredMapParsedDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): MapParsedDocumentFnType => {
        return (mdParsedDocument: MdParsedDocument): ITargetDocument => {
            function parseWithMarked(tokens: any) {
                tokens.links = Object.create(null); // pour fix erreur levée ici https://github.com/markedjs/marked/blob/master/lib/marked.js#L642
                return marked.parser(tokens, conf.markedOptions);
            }

            if (mdParsedDocument.documentPaths.basename === 'SUMMARY') {
                return TargetDocument.createTargetDocument({
                    documentPaths: mdParsedDocument.documentPaths,
                    transformedData: marked.parser(mdParsedDocument.parsedTokensList, conf.markedOptions),
                    fmMetaData: mdParsedDocument.fmMetaData
                });

            } else {
                const mdParsedDocumentImpl = mdParsedDocument as MdParsedDocumentImpl;
                const qaFmMetaData = mdParsedDocumentImpl.fmMetaData as FmQa;

                const qaContent = parseWithMarked(mdParsedDocumentImpl.parsedTokensList);
                const questionTitle = parseWithMarked(mdParsedDocumentImpl.questionTitleToken);
                const transformedData = `<QA create_date="${qaFmMetaData.getCreateDate()}" last_update="${qaFmMetaData.getLastUpdateDate()}" name="${mdParsedDocumentImpl.documentPaths.basename}">${questionTitle}<author name="${qaFmMetaData.author}"/><keywords>${qaFmMetaData.keywords}</keywords><answer>${qaContent}</answer></QA>`;

                return TargetDocumentImpl.createTargetDocumentImpl(
                    TargetDocument.createTargetDocument({
                        documentPaths: mdParsedDocumentImpl.documentPaths,
                        transformedData,
                        fmMetaData: qaFmMetaData
                    }),
                    mdParsedDocumentImpl.documentPaths.basename,
                    parseWithMarked(mdParsedDocumentImpl.sectionTitleToken)
                );
            }
        };
    };
}
