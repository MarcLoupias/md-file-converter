'use strict';

function strong(text) {
    return `[b]${text}[/b]`;
}

function em(text) {
    return `[i]${text}[/i]`;
}

function codespan(text) {
    return `[C]${text}[/C]`;
}

function br() {
    return '\n';
}

function del(text) {
    return `[s]${text}[/s]`;
}

function link(href, title, text) {
    return `[url=${href}]${text}[/url]`;
}

function image(href) {
    return `[img=${href}]`;
}

function text(text) {
    return text;
}

module.exports = {
    strong, em, codespan, br, del, link, image, text
};
