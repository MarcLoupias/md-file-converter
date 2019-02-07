#!/usr/bin/env node

'use strict';

/* tslint:disable:no-console */

/*
 * Source Map setup
 */

if (process.env.DEV_MODE) {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

/*
 * Imports
 */

import { PackageJson } from 'package-json';

const debug = require('debug')('app:debug');
const pkg: PackageJson = require('../package.json');

import * as program from 'commander';
import * as fm from 'front-matter';
import { promises } from 'fs';
import * as marked from 'marked';
import * as path from 'path';
import { sync } from 'glob';

import { CliLogger } from './io/cli-logger';
import { FilesHelper } from './io/files-helper';
import { InterpretGlobFnType, makeInterpretGlob } from './io/interpret-glob';
import { LoadImplPkgFnType, makeLoadImplPkg } from './io/load-impl-pkg';

import {
    UnConfiguredReadMdDocumentFnType,
    UnConfiguredTokenizeMdDocumentFnType,
    ParseLexeredDocumentFnType,
    MapParsedDocumentFnType,
    UnConfiguredMapParsedDocumentFnType,
    IReducerConf,
    GetReducerParametersFnType,
    ReduceTargetDocumentListFnType,
    WriteTargetDocumentFnType,
    IImplPkgBasic, IImplPkgParser, IImplPkgMapper, IImplPkgReducer
} from './model/action-convert/types';

import { IDocumentPaths, IMdDocument, IMdLexeredDocument, IMdParsedDocument, ITargetDocument } from './model/documents/interfaces';
import { DocumentPaths, MdDocument, MdLexeredDocument, MdParsedDocument, TargetDocument } from './model/documents/default-impl';

import {
    makeUnConfiguredReadMdDocument,
    makeUnConfiguredTokenizeMdDocument,
    parseLexeredDocument,
    makeUnConfiguredMapParsedDocument,
    makeWriteTargetDocument
} from './model/action-convert/default-impl';

import { makeActionConvert } from './actions/action-convert';

/*
 * Exports
 */

export {
    ParseLexeredDocumentFnType,
    MapParsedDocumentFnType,
    UnConfiguredMapParsedDocumentFnType,
    IReducerConf,
    GetReducerParametersFnType,
    ReduceTargetDocumentListFnType,
    IImplPkgBasic, IImplPkgParser, IImplPkgMapper, IImplPkgReducer,
    IDocumentPaths, IMdDocument, IMdLexeredDocument, IMdParsedDocument, ITargetDocument,
    DocumentPaths, MdDocument, MdLexeredDocument, MdParsedDocument, TargetDocument
};

/*
 * Manual DI
 */

const cliLogger: CliLogger = CliLogger.makeCliLogger({ pkg, console });
const filesHelper: FilesHelper = FilesHelper.makeFilesHelper({ process, debug, promises });
const interpretGlob: InterpretGlobFnType = makeInterpretGlob({ globSync: sync, cliLogger, process });
const loadImplPkg: LoadImplPkgFnType = makeLoadImplPkg({ process, require, cliLogger });

const unConfiguredReadMdDocument: UnConfiguredReadMdDocumentFnType = makeUnConfiguredReadMdDocument({ debug, path, fm, filesHelper });
const unConfiguredTokenizeMdDocument: UnConfiguredTokenizeMdDocumentFnType = makeUnConfiguredTokenizeMdDocument({ marked });
const unConfiguredMapParsedDocument: UnConfiguredMapParsedDocumentFnType = makeUnConfiguredMapParsedDocument({ marked });
const writeTargetDocument: WriteTargetDocumentFnType = makeWriteTargetDocument({ filesHelper, cliLogger });

const actionConvert = makeActionConvert(
    {
        interpretGlob, debug, path, cliLogger, loadImplPkg,
        unConfiguredReadMdDocument,
        defaultImpl: {
            unConfiguredTokenizeMdDocument,
            parseLexeredDocument,
            unConfiguredMapParsedDocument
        },
        writeTargetDocument
    });

/*
 * CLI definition
 */

program
    .version(pkg.version, '-v, --version');

program
    .command('convert <implPkg> <globPattern>')
    .option('-d, --dest <path>', 'Specify an absolute or relative directory destination <path> for the converted file(s). <path> MUST exist.')
    .option('-f, --filename <filename>', 'When reducing to a single file, specify the filename <filename> (without extension which is defined in the impl pkg) for the converted file. ')
    .description('Convert the files grabbed by <globPattern> with the <implPkg> implementation package.')
    .action(actionConvert);

program.parse(process.argv);

const validCommands = program.commands.map((cmd: any) => {
    return cmd._name;
});

if (!program.args.length) {
    console.log(`${pkg.name} : `, pkg.homepage, '\n');
    program.help();

} else if (validCommands.indexOf(process.argv[2]) === -1) {
    console.log('Invalid argument :', process.argv[2]);
    console.log(`${pkg.name} : `, pkg.homepage, '\n');
    program.help();
}
