'use strict';

import { IDebugger } from 'debug';
import { InterpretGlobFnType } from '../io/interpret-glob';
import { CliLogger } from '../io/cli-logger';
import { LoadImplPkgFnType } from '../io/load-impl-pkg';

import { MarkedOptions } from 'marked';
import { IDocumentPaths, IMdDocument, ITargetDocument } from '../model/documents/interfaces';
import { DocumentPaths, MdDocument } from '../model/documents/default-impl';
import {
    IReducerConf,
    ReadMdDocumentFnType, TokenizeMdDocumentFnType, ParseLexeredDocumentFnType, MapParsedDocumentFnType,
    UnConfiguredReadMdDocumentFnType,
    UnConfiguredTokenizeMdDocumentFnType,
    UnConfiguredMapParsedDocumentFnType,
    WriteTargetDocumentFnType,
    implementIImplPkgBasic, implementIImplPkgParser, implementIImplPkgMapper, implementIImplPkgReducer
} from '../model/action-convert/types';

export function makeActionConvert(deps: {
    interpretGlob: InterpretGlobFnType,
    debug: IDebugger,
    path: any,
    cliLogger: CliLogger,
    loadImplPkg: LoadImplPkgFnType,
    unConfiguredReadMdDocument: UnConfiguredReadMdDocumentFnType,
    defaultImpl: {
        unConfiguredTokenizeMdDocument: UnConfiguredTokenizeMdDocumentFnType,
        parseLexeredDocument: ParseLexeredDocumentFnType,
        unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType
    },
    writeTargetDocument: WriteTargetDocumentFnType
}) {
    return (implPkg: string, globPattern: string, options: any) => {
        (async () => {
            deps.debug(
                'action "convert" to convert <globPattern>="%s" file(s) to <implPkg>="%s" implementation',
                globPattern,
                implPkg
            );

            let destPathOption: string = '';
            if (options.dest) {
                deps.debug('--dest option set with value : %s', options.dest);
                destPathOption = options.dest;
            }

            let filenameOption: string = '';
            if (options.filename) {
                deps.debug('--filename option set with value : %s', options.filename);
                filenameOption = options.filename;
            }

            deps.cliLogger.logHeader();

            /*
             * 1/ build the file list to process with glob
             **/

            const filePathList: string[] = deps.interpretGlob(globPattern);

            /*
             * 2/ load the impl pkg
             **/

            const loadedImplPkg: unknown = deps.loadImplPkg(implPkg);

            if (!implementIImplPkgBasic(loadedImplPkg)) {
                throw new Error('Invalid package. Implementing IImplPkgBasic interface is mandatory.');
            }

            /*
             * 3/ Configuration
             **/

            deps.cliLogger.logBeforeConfig();

            // marked conf

            const markedOptions: MarkedOptions = loadedImplPkg.markedOptions;

            // files paths conf

            const targetDocumentFileExtension: string = loadedImplPkg.targetDocumentFileExtension;
            let targetDocumentPaths: IDocumentPaths = null;
            if (implementIImplPkgReducer(loadedImplPkg)) {
                const destFilename: string =
                    (filenameOption) ?
                        `${filenameOption}${targetDocumentFileExtension}` :
                        `default-target-document-filename${targetDocumentFileExtension}`;

                const dest: string = (destPathOption) ? deps.path.join(destPathOption, destFilename) : destFilename;
                targetDocumentPaths = DocumentPaths.createDocumentPaths({ src: '', dest, basename: filenameOption});
            }

            // reading md files and tokenize md are defaults

            const configuredReadMdDocument: ReadMdDocumentFnType =
                deps.unConfiguredReadMdDocument({ targetDocumentFileExtension, destPathOption });

            const configuredTokenizeMdDocument: TokenizeMdDocumentFnType =
                deps.defaultImpl.unConfiguredTokenizeMdDocument({ markedOptions });

            // impl-pkg or default-impl ?

            const configuredParseLexeredDocument: ParseLexeredDocumentFnType =
                (implementIImplPkgParser(loadedImplPkg)) ?
                    loadedImplPkg.parseLexeredDocument :
                    deps.defaultImpl.parseLexeredDocument;

            const configuredMapParsedDocument: MapParsedDocumentFnType =
                (implementIImplPkgMapper(loadedImplPkg)) ?
                    loadedImplPkg.unConfiguredMapParsedDocument({ markedOptions }) :
                    deps.defaultImpl.unConfiguredMapParsedDocument({ markedOptions });

            deps.cliLogger.logAfterConfig();

            /*
             * 4/ Execution
             **/

            deps.cliLogger.logBeforeProcessingFiles();

            const mdDocumentListPromises: Array<Promise<IMdDocument>> = filePathList.map(configuredReadMdDocument);
            const mdDocumentList: MdDocument[] = await Promise.all(mdDocumentListPromises);

            const targetDocumentList: ITargetDocument[] = mdDocumentList
                .map(configuredTokenizeMdDocument)
                .map(configuredParseLexeredDocument)
                .map(configuredMapParsedDocument);

            let reducedTargetDocumentList: ITargetDocument[];
            if (implementIImplPkgReducer(loadedImplPkg)) {
                const reducerConf: IReducerConf = await loadedImplPkg.getReducerConf({ targetDocumentPaths, targetDocumentList });

                deps.cliLogger.logBeforeReduce(reducerConf);

                reducedTargetDocumentList = reducerConf.arr.reduce(
                    loadedImplPkg.reduceTargetDocumentList,
                    reducerConf.initialValue
                );
            }

            /*
             * 5/ write target document onto the filesystem
             **/

            const targetDocumentListToWrite: ITargetDocument[] =
                (implementIImplPkgReducer(loadedImplPkg)) ? reducedTargetDocumentList : targetDocumentList;

            await Promise.all(targetDocumentListToWrite.map(deps.writeTargetDocument));

            deps.cliLogger.logAfterProcessingFiles();

        })().catch((e) => {
            deps.cliLogger.logErrorDuringActionFunction(e);
        });
    };
}
