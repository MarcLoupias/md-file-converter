'use strict';

/*
 * block level
 */

function codeFn(code: string, language: string): string {
    if (language !== 'text') {
        return `<code langage="${language}" showLines="1"><![CDATA[${code}]]></code>`;
    } else {
        return `<code langage="${language}"><![CDATA[${code}]]></code>`;
    }

}

function blockquoteFn(quote: string): string {
    return `<citation>${quote}</citation>`;
}

function htmlFn(html: string): string {
    return html;
}

function headingFn(text: string): string {
    return `<question>${text}</question>`;
}

function hrFn(): string {
    return '<br />';
}

function listFn(body: string, ordered: boolean): string {
    return (ordered) ? `<liste type="1">${body}</liste>` : `<liste>${body}</liste>`;
}

function listitemFn(text: string): string {
    return `<element>${text}</element>`;
}

function paragraphFn(text: string): string {
    return `<paragraph>${text}</paragraph>`;
}

function tableFn(header: string, body: string): string {
    return `<tableau width="80%" border="1">${header}${body}</tableau>`;
}

function tablerowFn(content: string): string {
    return `<ligne>${content}</ligne>`;
}

function tablecellFn(content: string, flags: {header: boolean, align: 'center' | 'left' | 'right' | null}): string {
    const tag = (flags.align) ? `<colonne align=${flags.align}>` : '<colonne>';
    return `${tag}${content}</colonne>`;
}

/*
 * inline level
 */

function strongFn(text: string): string {
    return `<b>${text}</b>`;
}

function emFn(text: string): string {
    return `<i>${text}</i>`;
}

function codespanFn(text: string): string {
    return `<inline>${text}</inline>`;
}

function brFn(): string {
    return '<br />';
}

function delFn(text: string): string {
    return `<s>${text}</s>`;
}

function linkFn(href: string, title: string, text: string): string {
    return `<link href="${href}">${text}</link>`;
}

function imageFn(href: string): string {
    return `<image src="${href}" />`;
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
