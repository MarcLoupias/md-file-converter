'use strict';

import * as marked from 'marked';

import markedRendererXmlImpl from './marked-renderer-xml-impl';
import { parseLexeredDocument } from './parse-lexered-document';
import { makeUnConfiguredMapParsedDocument } from './map-parsed-document';
import {
    IImplPkgBasic,
    IImplPkgParser,
    IImplPkgMapper,
    ParseLexeredDocumentFnType,
    UnConfiguredMapParsedDocumentFnType
} from './model/action-convert/types';

const targetDocumentFileExtension = '.xml';
const unConfiguredMapParsedDocument = makeUnConfiguredMapParsedDocument({ marked });
const markedRenderer: marked.Renderer = Object.assign(
    new marked.Renderer(),
    { ...markedRendererXmlImpl }
);
const markedOptions: marked.MarkedOptions = {
    renderer: markedRenderer,
    smartypants: true,
    gfm: true,
    breaks: true
};

class MapToXmlImplPkg implements IImplPkgBasic, IImplPkgParser, IImplPkgMapper {
    public markedOptions: marked.MarkedOptions = markedOptions;
    public targetDocumentFileExtension: string = targetDocumentFileExtension;
    public parseLexeredDocument: ParseLexeredDocumentFnType = parseLexeredDocument;
    public unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType = unConfiguredMapParsedDocument;
}

export default new MapToXmlImplPkg();
