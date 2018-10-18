'use strict';

import { IDocumentPaths } from '../interfaces';

export class DocumentPaths implements IDocumentPaths {
    public static createDocumentPaths(documentPaths: IDocumentPaths): DocumentPaths {
        return new DocumentPaths(documentPaths);
    }

    public src: string;
    public dest: string;
    public basename: string;

    protected constructor(documentPaths: IDocumentPaths) {
        this.src = documentPaths.src;
        this.dest = documentPaths.dest;
        this.basename = documentPaths.basename;
    }
}
