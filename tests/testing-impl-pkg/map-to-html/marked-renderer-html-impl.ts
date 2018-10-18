'use strict';

/*
 * inline level
 */

function link(href: string, title: string, text: string): string {
    const htmlHref = href.substring(0, href.length - 2) + 'html';
    return `<a href="${htmlHref}">${text}</a>`;
}

export default {
    link
};
