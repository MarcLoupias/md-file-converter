'use strict';

const blockLevelMethods = require('./block-level');
const inlineLevelMethods = require('./inline-level');
const marked = require('marked');

function getParser() {
    console.log('-- Initialize parser --');

    const renderer = Object.assign(
        new marked.Renderer(),
        { ...blockLevelMethods },
        { ...inlineLevelMethods }
    );

    const options = {
        renderer: renderer,
        smartypants: true,
        gfm: true,
        breaks: true
    };

    console.log('-- Initialize parser -- done --');

    return {
        parse: function(src) {
            return marked(src, options);
        }
    };
}

module.exports = {
    getParser
};
