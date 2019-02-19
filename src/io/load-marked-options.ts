'use strict';

import { CliLogger } from './cli-logger';
import { MarkedOptions } from 'marked';

function isMarkedOptions(options: any): options is MarkedOptions {
    return (
        'baseUrl' in options && typeof options.baseUrl === 'string' ||
        'breaks' in options && typeof options.breaks === 'boolean' ||
        'gfm' in options && typeof options.gfm === 'boolean' ||
        'headerIds' in options && typeof options.headerIds === 'boolean' ||
        'headerPrefix' in options && typeof options.headerPrefix === 'string' ||
        'highlight' in options && typeof options.highlight === 'function' ||
        'langPrefix' in options && typeof options.langPrefix === 'string' ||
        'mangle' in options && typeof options.mangle === 'boolean' ||
        'pedantic' in options && typeof options.pedantic === 'boolean' ||
        'sanitize' in options && typeof options.sanitize === 'boolean' ||
        'sanitizer' in options && typeof options.sanitizer === 'function' ||
        'silent' in options && typeof options.silent === 'boolean' ||
        'smartLists' in options && typeof options.smartLists === 'boolean' ||
        'smartypants' in options && typeof options.smartypants === 'boolean' ||
        'tables' in options && typeof options.tables === 'boolean' ||
        'xhtml' in options && typeof options.xhtml === 'boolean'
    );
}

export type LoadMarkedOptionsFnType = (markedOptionsFilePath: string) => MarkedOptions;

export function makeLoadMarkedOptions(deps: { process: any, require: NodeRequireFunction, cliLogger: CliLogger }): LoadMarkedOptionsFnType {
    return (markedOptionsFilePath: string): MarkedOptions => {
        let options: unknown;

        try {
            options = deps.require(markedOptionsFilePath);

        } catch (e) {
            deps.cliLogger.logErrorNoMarkedOptionsFileForTheGivenPath(markedOptionsFilePath);
            process.exitCode = 1;
            throw new Error(e);
        }

        if (isMarkedOptions(options)) {
            if (options.renderer) {
                throw new Error('Invalid MarkedOptions file to overwrite implementation package default options. Overwriting the renderer property is forbidden.');
            }

            return options as MarkedOptions;
        }

        throw new Error('Invalid MarkedOptions file to overwrite implementation package default options. Should contains at least one valid property.');
    };
}
