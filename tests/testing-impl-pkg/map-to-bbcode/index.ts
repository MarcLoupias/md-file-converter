'use strict';

import * as marked from 'marked';
import markedRendererBBCodeImpl from './marked-renderer-bbcode-impl';
import { IImplPkgBasic } from './model/action-convert/types';

const targetDocumentFileExtension = '.bbcode';
const markedRenderer: marked.Renderer = Object.assign(
    new marked.Renderer(),
    { ...markedRendererBBCodeImpl }
);
const markedOptions: marked.MarkedOptions = {
    renderer: markedRenderer,
    smartypants: true,
    gfm: true,
    breaks: true
};

class MapToBBCodeImplPkg implements IImplPkgBasic {
    public markedOptions: marked.MarkedOptions = markedOptions;
    public targetDocumentFileExtension: string = targetDocumentFileExtension;
}

export default new MapToBBCodeImplPkg();
