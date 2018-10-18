'use strict';

import * as marked from 'marked';

const markedRenderer: marked.Renderer = new marked.Renderer();
const markedOptions: marked.MarkedOptions = {
    renderer: markedRenderer,
    smartypants: true,
    gfm: true,
    breaks: true
};

class InvalidImplPkg {
    public markedOptions: marked.MarkedOptions = markedOptions;
}

export default new InvalidImplPkg();
