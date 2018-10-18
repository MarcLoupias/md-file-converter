'use strict';

import * as marked from 'marked';

import markedRendererMdImpl from './marked-renderer-md-impl';
import { parseLexeredDocument } from './parse-lexered-document';
import { makeUnConfiguredMapParsedDocument } from './map-parsed-document';
import { getReducerConf } from './get-reducer-conf';
import { reduceTargetDocumentList } from './reduce-target-document-list';

import {
    IImplPkgBasic,
    IImplPkgParser,
    IImplPkgMapper,
    IImplPkgReducer,
    ParseLexeredDocumentFnType,
    UnConfiguredMapParsedDocumentFnType,
    GetReducerParametersFnType,
    ReduceTargetDocumentListFnType
} from './model/action-convert/types';

const targetDocumentFileExtension = '.md';
const unConfiguredMapParsedDocument = makeUnConfiguredMapParsedDocument({ marked });
const markedRenderer: marked.Renderer = Object.assign(
    new marked.Renderer(),
    { ...markedRendererMdImpl }
);
const markedOptions: marked.MarkedOptions = {
    renderer: markedRenderer,
    smartypants: true,
    gfm: true,
    breaks: true
};

class MapReduceToMdImplPkg implements IImplPkgBasic, IImplPkgParser, IImplPkgMapper, IImplPkgReducer {
    public markedOptions: marked.MarkedOptions = markedOptions;
    public targetDocumentFileExtension: string = targetDocumentFileExtension;
    public parseLexeredDocument: ParseLexeredDocumentFnType = parseLexeredDocument;
    public unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType = unConfiguredMapParsedDocument;
    public getReducerConf: GetReducerParametersFnType = getReducerConf;
    public reduceTargetDocumentList: ReduceTargetDocumentListFnType = reduceTargetDocumentList;
}

export default new MapReduceToMdImplPkg();
