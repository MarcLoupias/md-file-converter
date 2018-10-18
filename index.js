'use strict';

const fsp = require("fs").promises;
const path = require('path');
const parserFactory = require('./lib/parser-factory');

// ---

async function convert({ parser, fsp }, src, dest) {
    console.log(`src : ${src}\ndest : ${dest}`);

    try {
        const mdData = await fsp.readFile(src, { encoding: 'utf-8' });
        const bbCodeData = parser.parse(mdData);
        await fsp.writeFile(dest, bbCodeData);
    }
    catch(e) {
        throw new Error(e);
    }

    console.log('writing ', dest);
}

async function main() {
    const parser = parserFactory.getParser();

    try {
        await convert(
            { parser, fsp },
            path.join(__dirname, 'assets/md/test1.md'),
            path.join(__dirname, 'assets/bbcode/test.bbcode')
        );
    }
    catch(e) {
        console.error('Erreur sur convert 1', e);
    }

    try {
        await convert(
            { parser, fsp },
            path.join(__dirname, 'assets/md/test2.md'),
            path.join(__dirname, 'assets/bbcode/test2.bbcode')
        );
    }
    catch(e) {
        console.error('Erreur sur convert 2', e);
    }
}

/*
 * Execution
 * */

main()
    .catch(error => console.error('Erreur sur main', error));
