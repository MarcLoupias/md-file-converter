'use strict';

/*
 * block level
 */

function codeFn(code: string): string {
    return `[code]\n${code}\n[/code]\n`;
}

function blockquoteFn(quote: string): string {
    return `[quote]\n${quote}\n[/quote]\n`;
}

function htmlFn(html: string): string {
    return html;
}

function headingFn(text: string, level: number): string {
    return `[SIZE=${level}]${text}[/SIZE]\n\n`;
}

function hrFn(): string {
    return '[hr]\n';
}

function listFn(body: string, ordered: boolean): string {
    return (ordered) ? `[list=1]\n${body}[/list]\n` : `[list]\n${body}[/list]\n\n`;
}

function listitemFn(text: string): string {
    return `[*]${text}\n`;
}

function paragraphFn(text: string): string {
    return `${text}\n\n`;
}

function tableFn(header: string, body: string): string {
    return `[table]\n${header}${body}[/table]\n`;
}

function tablerowFn(content: string): string {
    return `[tr]\n${content}[/tr]\n`;
}

function tablecellFn(content: string, flags: {header: boolean, align: 'center' | 'left' | 'right' | null}): string {
    const type = flags.header ? 'th' : 'td';
    const tag = (flags.align) ? `[${type} align=${flags.align}]` : `[${type}]`;
    return `${tag}${content}[/${type}]\n`;
}

/*
 * inline level
 */

function strongFn(text: string): string {
    return `[b]${text}[/b]`;
}

function emFn(text: string): string {
    return `[i]${text}[/i]`;
}

function codespanFn(text: string): string {
    return `[C]${text}[/C]`;
}

function brFn(): string {
    return '\n';
}

function delFn(text: string): string {
    return `[s]${text}[/s]`;
}

function linkFn(href: string, title: string, text: string): string {
    const bbCodeHref = href.substring(0, href.length - 2) + 'bbcode';
    return `[url=${bbCodeHref}]${text}[/url]`;
}

function imageFn(href: string): string {
    return `[img=${href}]`;
}

function textFn(text: string): string {
    return text;
}

export default {
    code: codeFn,
    blockquote: blockquoteFn,
    html: htmlFn,
    heading: headingFn,
    hr: hrFn,
    list: listFn,
    listitem: listitemFn,
    paragraph: paragraphFn,
    table: tableFn,
    tablerow: tablerowFn,
    tablecell: tablecellFn,
    strong: strongFn,
    em: emFn,
    codespan: codespanFn,
    br: brFn,
    del: delFn,
    link: linkFn,
    image: imageFn,
    text: textFn
};
