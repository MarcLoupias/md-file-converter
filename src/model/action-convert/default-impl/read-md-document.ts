'use strict';

import { DocumentPaths, MdDocument } from '../../documents/default-impl';
import { IDebugger } from 'debug';
import { FilesHelper } from '../../../io/files-helper';
import { ReadMdDocumentFnType, UnConfiguredReadMdDocumentFnType } from '../types';

export function makeUnConfiguredReadMdDocument(deps: { debug: IDebugger, path: any, fm: any, filesHelper: FilesHelper }): UnConfiguredReadMdDocumentFnType {
    return (conf: { targetDocumentFileExtension: string, destPathOption: string }): ReadMdDocumentFnType => {
        return async function (srcPath: string): Promise<MdDocument> {
            const rawData = await deps.filesHelper.readFile(srcPath);

            const destFileName = deps.path.basename(srcPath, '.md') + conf.targetDocumentFileExtension;
            const dest = (conf.destPathOption) ? deps.path.join(conf.destPathOption, destFileName) : deps.path.join(deps.path.dirname(srcPath), destFileName);

            if (deps.fm.test(rawData)) {
                deps.debug('readMdDocument : FrontMatter meta data available');

                const content = deps.fm(rawData);

                return MdDocument.createMdDocument({
                    documentPaths: DocumentPaths.createDocumentPaths({src: srcPath, dest, basename: deps.path.basename(srcPath, '.md')}),
                    mdData: content.body,
                    fmMetaData: content.attributes
                });

            } else {
                deps.debug('readMdDocument : FrontMatter meta data unavailable');

                return MdDocument.createMdDocument({
                    documentPaths: DocumentPaths.createDocumentPaths({src: srcPath, dest, basename: deps.path.basename(srcPath, '.md')}),
                    mdData: rawData
                });
            }
        };
    };
}
