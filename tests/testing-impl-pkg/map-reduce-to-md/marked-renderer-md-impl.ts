'use strict';

/*
 * block level
 */

function codeFn(code: string, language: string): string {
    return `\`\`\`${language}
${code}
\`\`\``;
}

function blockquoteFn(quote: string): string {
    return `>${quote}`;
}

function htmlFn(html: string): string {
    return html;
}

function headingFn(text: string, level: number): string {
    switch (level) {
        case 1: {
            return `# ${text}\n`;
        }
        case 2: {
            return `## ${text}\n`;
        }
        case 3: {
            return `### ${text}\n`;
        }
        case 4: {
            return `#### ${text}\n`;
        }
        case 5: {
            return `##### ${text}\n`;
        }
        case 6: {
            return `###### ${text}\n`;
        }
        default:
            throw new Error('Invalid heading level.');
    }
}

function hrFn(): string {
    return '---';
}

function listFn(body: string): string {
    return `${body}`;
}

function listitemFn(text: string): string {
    return `- ${text}`;
}

function paragraphFn(text: string): string {
    return `${text}`;
}

function tableFn(header: string, body: string): string {
    return `${header}${body}`;
}

function tablerowFn(content: string): string {
    return `|${content}`;
}

function tablecellFn(content: string): string {
    return content;
}

/*
 * inline level
 */

function strongFn(text: string): string {
    return `**${text}**`;
}

function emFn(text: string): string {
    return `*${text}*`;
}

function codespanFn(text: string): string {
    return `\`>${text}\``;
}

function brFn(): string {
    return '---';
}

function delFn(text: string): string {
    return `${text}`;
}

function linkFn(href: string, title: string, text: string): string {
    return `[${text}](${href})`;
}

function imageFn(href: string): string {
    return `![image](${href})`;
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
