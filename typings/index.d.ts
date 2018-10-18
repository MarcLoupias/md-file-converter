// Type definitions for md-file-convert 0.1.0
// Project: https://github.com/MarcLoupias/md-file-converter
// Definitions by: Marc Loupias <https://github.com/MarcLoupias>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { MarkedOptions, TokensList } from 'marked';

/* Documents model interfaces */

declare interface IDocumentPaths {
    src: string;
    dest: string;
    basename: string;
}

declare interface IMdDocument {
    documentPaths: IDocumentPaths;
    mdData: string;
    fmMetaData?: object;
}

declare interface IMdLexeredDocument {
    documentPaths: IDocumentPaths;
    tokensList: TokensList;
    fmMetaData?: object;
}

declare interface IMdParsedDocument {
    documentPaths: IDocumentPaths;
    parsedTokensList: TokensList;
    fmMetaData?: object;
}

declare interface ITargetDocument {
    documentPaths: IDocumentPaths;
    transformedData: string;
    fmMetaData?: object;
}

/* Documents model default impl */

declare class DocumentPaths implements IDocumentPaths {
    static createDocumentPaths(documentPaths: IDocumentPaths): DocumentPaths;
    public src: string;
    public dest: string;
    public basename: string;
}
declare class MdDocument implements IMdDocument {
    static createMdDocument(mdDocument: IMdDocument): MdDocument;
    public documentPaths: IDocumentPaths;
    public mdData: string;
    public fmMetaData?: object;
}
declare class MdLexeredDocument implements IMdLexeredDocument {
    static createMdLexeredDocument(lexeredDocument: IMdLexeredDocument): MdLexeredDocument;
    public documentPaths: IDocumentPaths;
    public tokensList: TokensList;
    public fmMetaData?: object;
}
declare class MdParsedDocument implements IMdParsedDocument {
    static createMdParsedDocument(parsedDocument: IMdParsedDocument): MdParsedDocument;
    public documentPaths: IDocumentPaths;
    public parsedTokensList: TokensList;
    public fmMetaData?: object;
}
declare class TargetDocument implements ITargetDocument {
    static createTargetDocument(targetDocument: ITargetDocument): TargetDocument;
    public documentPaths: IDocumentPaths;
    public transformedData: string;
    public fmMetaData?: object;
}

/* Implementation package model interfaces and functions defs */

declare type ParseLexeredDocumentFnType = (mdLexeredDocument: IMdLexeredDocument) => IMdParsedDocument;

declare type MapParsedDocumentFnType = (mdParsedDocument: IMdParsedDocument) => ITargetDocument;
declare type UnConfiguredMapParsedDocumentFnType = (conf: { markedOptions: MarkedOptions }) => MapParsedDocumentFnType;

declare interface IReducerConf {
    arr: ITargetDocument[];
    initialValue: ITargetDocument[];
}
declare type GetReducerParametersFnType = (initialValues: { targetDocumentPaths: IDocumentPaths, targetDocumentList: ITargetDocument[] }) => IReducerConf;
declare type ReduceTargetDocumentListFnType = (accumulator: ITargetDocument[], currentValue: ITargetDocument, currentIndex: number, array: ITargetDocument[]) => ITargetDocument[];

/* Implementation packages contracts */

declare interface IImplPkgBasic {
    targetDocumentFileExtension: string;
    markedOptions: MarkedOptions;
}

declare interface IImplPkgParser {
    parseLexeredDocument: ParseLexeredDocumentFnType;
}

declare interface IImplPkgMapper {
    unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType;
}

declare interface IImplPkgReducer {
    getReducerConf: GetReducerParametersFnType;
    reduceTargetDocumentList: ReduceTargetDocumentListFnType;
}
