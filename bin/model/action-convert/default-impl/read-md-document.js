'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const default_impl_1 = require("../../documents/default-impl");
function makeUnConfiguredReadMdDocument(deps) {
    return (conf) => {
        return async function (srcPath) {
            const rawData = await deps.filesHelper.readFile(srcPath);
            const destFileName = deps.path.basename(srcPath, '.md') + conf.targetDocumentFileExtension;
            const dest = (conf.destPathOption) ? deps.path.join(conf.destPathOption, destFileName) : deps.path.join(deps.path.dirname(srcPath), destFileName);
            if (deps.fm.test(rawData)) {
                deps.debug('readMdDocument : FrontMatter meta data available');
                const content = deps.fm(rawData);
                return default_impl_1.MdDocument.createMdDocument({
                    documentPaths: default_impl_1.DocumentPaths.createDocumentPaths({ src: srcPath, dest, basename: deps.path.basename(srcPath, '.md') }),
                    mdData: content.body,
                    fmMetaData: content.attributes
                });
            }
            else {
                deps.debug('readMdDocument : FrontMatter meta data unavailable');
                return default_impl_1.MdDocument.createMdDocument({
                    documentPaths: default_impl_1.DocumentPaths.createDocumentPaths({ src: srcPath, dest, basename: deps.path.basename(srcPath, '.md') }),
                    mdData: rawData
                });
            }
        };
    };
}
exports.makeUnConfiguredReadMdDocument = makeUnConfiguredReadMdDocument;
