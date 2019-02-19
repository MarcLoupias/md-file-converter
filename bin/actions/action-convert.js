'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const default_impl_1 = require("../model/documents/default-impl");
const types_1 = require("../model/action-convert/types");
function makeActionConvert(deps) {
    return (implPkg, globPattern, options) => {
        (async () => {
            deps.debug('action "convert" to convert <globPattern>="%s" file(s) to <implPkg>="%s" implementation', globPattern, implPkg);
            let destPathOption = '';
            if (options.dest) {
                deps.debug('--dest option set with value : %s', options.dest);
                destPathOption = options.dest;
            }
            let filenameOption = '';
            if (options.filename) {
                deps.debug('--filename option set with value : %s', options.filename);
                filenameOption = options.filename;
            }
            let markedOptionsFilePath = '';
            if (options.overwriteMarkedOptions) {
                deps.debug('--overwrite-marked-options option set with value : %s', options.overwriteMarkedOptions);
                markedOptionsFilePath = options.overwriteMarkedOptions;
            }
            deps.cliLogger.logHeader();
            const filePathList = deps.interpretGlob(globPattern);
            const loadedImplPkg = deps.loadImplPkg(implPkg);
            if (!types_1.implementIImplPkgBasic(loadedImplPkg)) {
                throw new Error('Invalid package. Implementing IImplPkgBasic interface is mandatory.');
            }
            deps.cliLogger.logBeforeConfig();
            let markedOptions = loadedImplPkg.markedOptions;
            if (options.overwriteMarkedOptions) {
                const markedOptionsOverwrite = deps.loadMarkedOptions(markedOptionsFilePath);
                markedOptions = Object.assign(markedOptions, { ...markedOptionsOverwrite });
            }
            const targetDocumentFileExtension = loadedImplPkg.targetDocumentFileExtension;
            let targetDocumentPaths = null;
            if (types_1.implementIImplPkgReducer(loadedImplPkg)) {
                const destFilename = (filenameOption) ?
                    `${filenameOption}${targetDocumentFileExtension}` :
                    `default-target-document-filename${targetDocumentFileExtension}`;
                const dest = (destPathOption) ? deps.path.join(destPathOption, destFilename) : destFilename;
                targetDocumentPaths = default_impl_1.DocumentPaths.createDocumentPaths({ src: '', dest, basename: filenameOption });
            }
            const configuredReadMdDocument = deps.unConfiguredReadMdDocument({ targetDocumentFileExtension, destPathOption });
            const configuredTokenizeMdDocument = deps.defaultImpl.unConfiguredTokenizeMdDocument({ markedOptions });
            const configuredParseLexeredDocument = (types_1.implementIImplPkgParser(loadedImplPkg)) ?
                loadedImplPkg.parseLexeredDocument :
                deps.defaultImpl.parseLexeredDocument;
            const configuredMapParsedDocument = (types_1.implementIImplPkgMapper(loadedImplPkg)) ?
                loadedImplPkg.unConfiguredMapParsedDocument({ markedOptions }) :
                deps.defaultImpl.unConfiguredMapParsedDocument({ markedOptions });
            deps.cliLogger.logAfterConfig();
            deps.cliLogger.logBeforeProcessingFiles();
            const mdDocumentListPromises = filePathList.map(configuredReadMdDocument);
            const mdDocumentList = await Promise.all(mdDocumentListPromises);
            const targetDocumentList = mdDocumentList
                .map(configuredTokenizeMdDocument)
                .map(configuredParseLexeredDocument)
                .map(configuredMapParsedDocument);
            let reducedTargetDocumentList;
            if (types_1.implementIImplPkgReducer(loadedImplPkg)) {
                const reducerConf = await loadedImplPkg.getReducerConf({ targetDocumentPaths, targetDocumentList });
                deps.cliLogger.logBeforeReduce(reducerConf);
                reducedTargetDocumentList = reducerConf.arr.reduce(loadedImplPkg.reduceTargetDocumentList, reducerConf.initialValue);
            }
            const targetDocumentListToWrite = (types_1.implementIImplPkgReducer(loadedImplPkg)) ? reducedTargetDocumentList : targetDocumentList;
            await Promise.all(targetDocumentListToWrite.map(deps.writeTargetDocument));
            deps.cliLogger.logAfterProcessingFiles();
        })().catch((e) => {
            deps.cliLogger.logErrorDuringActionFunction(e);
        });
    };
}
exports.makeActionConvert = makeActionConvert;
