'use strict';

function code(code) {
    return `[code]${code}\n[/code]`;
}

function blockquote(quote) {
    return `[quote]\n${quote}[/quote]\n`;
}

function html(html) {
    return html;
}

function heading(text, level) {
    let size = 1;
    if(level > 1 || level <= 7){
        size = 7 - level;
    }

    return `[SIZE=${size}]${text}[/SIZE]\n\n`;
}

function hr() {
    return '[hr]\n';
}

function list(body, ordered) {
    return (ordered) ? `[list=1]\n${body}[/list]\n` : `[list]\n${body}[/list]\n\n`;
}

function listitem(text) {
    return `[*]${text}\n`;
}

function paragraph(text) {
    return `${text}\n\n`;
}

function table(header, body) {
    return `[table]\n${header}${body}[/table]\n`
}

function tablerow(content) {
    return `[tr]\n${content}[/tr]\n`;
}

function tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const tag = (flags.align) ? `[${type} align=${flags.align}]`: `[${type}]`;
    return `${tag}${content}[/${type}]\n`;
}

module.exports = {
    code, blockquote, html, heading, hr, list, listitem, paragraph, table, tablerow, tablecell
};
