'use strict';

import { IReducerConf } from './model/action-convert/types';
import { IDocumentPaths, ITargetDocument } from './model/documents/interfaces';
import { TargetDocument } from './model/documents/default-impl';
import { ReducedTargetDocumentImpl } from './model-impl';

export function getReducerConf(initialValues: { targetDocumentPaths: IDocumentPaths, targetDocumentList: ITargetDocument[] }): IReducerConf {
    const arr = initialValues.targetDocumentList.filter((targetDocument: TargetDocument) => {
        return targetDocument.documentPaths.basename !== 'SUMMARY';
    });

    const faqMetaData = initialValues.targetDocumentList.filter((targetDocument: TargetDocument) => {
        return targetDocument.documentPaths.basename === 'SUMMARY';
    })[0].fmMetaData;

    const initialValue = [
        ReducedTargetDocumentImpl.createReducedTargetDocumentImpl(
            TargetDocument.createTargetDocument({
                documentPaths: initialValues.targetDocumentPaths,
                transformedData: '',
                fmMetaData: faqMetaData
            }),
            '',
            ''
        )
    ];

    return {
        arr,
        initialValue
    };
}
