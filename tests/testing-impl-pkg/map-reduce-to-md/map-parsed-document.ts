'use strict';

import { IMdParsedDocument, ITargetDocument } from './model/documents/interfaces';
import { TargetDocument } from './model/documents/default-impl';
import { MdParsedDocumentImpl, TargetDocumentImpl } from './model-impl';
import { UnConfiguredMapParsedDocumentFnType, MapParsedDocumentFnType } from './model/action-convert/types';
import { MarkedOptions, Tokens } from 'marked';

export function makeUnConfiguredMapParsedDocument({ marked }: any): UnConfiguredMapParsedDocumentFnType {
    return (conf: { markedOptions: MarkedOptions }): MapParsedDocumentFnType => {
        return (mdParsedDocument: IMdParsedDocument): ITargetDocument => {
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
                const questionTitleToken = mdParsedDocumentImpl.questionTitleToken[0] as Tokens.Heading;
                const questionTitle = questionTitleToken.text;
                const transformedData = `${questionTitle}`;

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
