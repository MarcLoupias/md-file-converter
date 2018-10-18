'use strict';

import { IMdParsedDocument } from './model/documents/interfaces';
import { MdLexeredDocument, MdParsedDocument } from './model/documents/default-impl';
import { MdParsedDocumentImpl } from './model-impl';
import { FmSummary, FmQa } from './model-impl/front-matter';
import { Token, TokensList } from 'marked';

export function parseLexeredDocument(mdLexeredDocument: MdLexeredDocument): IMdParsedDocument {
    function getQuestionTitleToken(tokens: TokensList): Token[] {
        for (const token of tokens) {
            if (token.type === 'heading' && token.depth === 3) {
                return [token];
            }
        }
    }

    function getSectionTitleToken(tokens: TokensList): Token[] {
        for (const token of tokens) {
            if (token.type === 'heading' && token.depth === 2) {
                return [token];
            }
        }
    }

    function filterIrrelevantTitlesTokens(token: Token): boolean {
        return token.type !== 'heading';
    }

    if (mdLexeredDocument.documentPaths.basename === 'SUMMARY') {
        return MdParsedDocument.createMdParsedDocument({
            documentPaths: mdLexeredDocument.documentPaths,
            parsedTokensList: mdLexeredDocument.tokensList,
            fmMetaData: new FmSummary(mdLexeredDocument.fmMetaData)
        });

    } else {
        return MdParsedDocumentImpl.createMdParsedDocumentImpl(
            MdParsedDocument.createMdParsedDocument({
                documentPaths: mdLexeredDocument.documentPaths,
                parsedTokensList: mdLexeredDocument.tokensList.filter(filterIrrelevantTitlesTokens) as TokensList,
                fmMetaData: new FmQa(mdLexeredDocument.fmMetaData)
            }),
            getQuestionTitleToken(mdLexeredDocument.tokensList) as TokensList,
            getSectionTitleToken(mdLexeredDocument.tokensList) as TokensList
        );
    }
}
