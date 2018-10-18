'use strict';

import { MarkedOptions } from 'marked';
import { IDocumentPaths, IMdDocument, IMdLexeredDocument, IMdParsedDocument, ITargetDocument } from '../../documents/interfaces';

/*
 * action-convert functions types
 */

export type ReadMdDocumentFnType = (srcPath: string) => Promise<IMdDocument>;
export type UnConfiguredReadMdDocumentFnType = (conf: { targetDocumentFileExtension: string, destPathOption: string }) => ReadMdDocumentFnType;

export type TokenizeMdDocumentFnType = (mdDocument: IMdDocument) => IMdLexeredDocument;
export type UnConfiguredTokenizeMdDocumentFnType = (conf: { markedOptions: MarkedOptions }) => TokenizeMdDocumentFnType;

export type ParseLexeredDocumentFnType = (mdLexeredDocument: IMdLexeredDocument) => IMdParsedDocument;

export type MapParsedDocumentFnType = (mdParsedDocument: IMdParsedDocument) => ITargetDocument;
export type UnConfiguredMapParsedDocumentFnType = (conf: { markedOptions: MarkedOptions }) => MapParsedDocumentFnType;

export interface IReducerConf {
    arr: ITargetDocument[];
    initialValue: ITargetDocument[];
}
export type GetReducerParametersFnType = (initialValues: { targetDocumentPaths: IDocumentPaths, targetDocumentList: ITargetDocument[] }) => IReducerConf;
export type ReduceTargetDocumentListFnType = (accumulator: ITargetDocument[], currentValue: ITargetDocument, currentIndex: number, array: ITargetDocument[]) => ITargetDocument[];

export type WriteTargetDocumentFnType = (targetDocument: ITargetDocument) => Promise<ITargetDocument>;

/*
 * Impl Pkg contracts
 */

export interface IImplPkgBasic {
    targetDocumentFileExtension: string;
    markedOptions: MarkedOptions;
}

export interface IImplPkgParser {
    parseLexeredDocument: ParseLexeredDocumentFnType;
}

export interface IImplPkgMapper {
    unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType;
}

export interface IImplPkgReducer {
    getReducerConf: GetReducerParametersFnType;
    reduceTargetDocumentList: ReduceTargetDocumentListFnType;
}

export function implementIImplPkgBasic(pkg: any): pkg is IImplPkgBasic {
    return (
        'targetDocumentFileExtension' in pkg && typeof pkg.targetDocumentFileExtension === 'string' &&
        'markedOptions' in pkg && typeof pkg.markedOptions === 'object'
    );
}

export function implementIImplPkgParser(pkg: any): pkg is IImplPkgParser {
    return ('parseLexeredDocument' in pkg && typeof pkg.parseLexeredDocument === 'function');
}

export function implementIImplPkgMapper(pkg: any): pkg is IImplPkgMapper {
    return ('unConfiguredMapParsedDocument' in pkg && typeof pkg.unConfiguredMapParsedDocument === 'function');
}

export function implementIImplPkgReducer(pkg: any): pkg is IImplPkgReducer {
    return (
        'getReducerConf' in pkg && typeof pkg.getReducerConf === 'function' &&
        'reduceTargetDocumentList' in pkg && typeof pkg.reduceTargetDocumentList === 'function'
    );
}
