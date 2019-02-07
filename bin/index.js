#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.DEV_MODE) {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}
const debug = require('debug')('app:debug');
const pkg = require('../package.json');
const program = require("commander");
const fm = require("front-matter");
const fs_1 = require("fs");
const marked = require("marked");
const path = require("path");
const glob_1 = require("glob");
const cli_logger_1 = require("./io/cli-logger");
const files_helper_1 = require("./io/files-helper");
const interpret_glob_1 = require("./io/interpret-glob");
const load_impl_pkg_1 = require("./io/load-impl-pkg");
const default_impl_1 = require("./model/documents/default-impl");
exports.DocumentPaths = default_impl_1.DocumentPaths;
exports.MdDocument = default_impl_1.MdDocument;
exports.MdLexeredDocument = default_impl_1.MdLexeredDocument;
exports.MdParsedDocument = default_impl_1.MdParsedDocument;
exports.TargetDocument = default_impl_1.TargetDocument;
const default_impl_2 = require("./model/action-convert/default-impl");
const action_convert_1 = require("./actions/action-convert");
const cliLogger = cli_logger_1.CliLogger.makeCliLogger({ pkg, console });
const filesHelper = files_helper_1.FilesHelper.makeFilesHelper({ process, debug, promises: fs_1.promises });
const interpretGlob = interpret_glob_1.makeInterpretGlob({ globSync: glob_1.sync, cliLogger, process });
const loadImplPkg = load_impl_pkg_1.makeLoadImplPkg({ process, require, cliLogger });
const unConfiguredReadMdDocument = default_impl_2.makeUnConfiguredReadMdDocument({ debug, path, fm, filesHelper });
const unConfiguredTokenizeMdDocument = default_impl_2.makeUnConfiguredTokenizeMdDocument({ marked });
const unConfiguredMapParsedDocument = default_impl_2.makeUnConfiguredMapParsedDocument({ marked });
const writeTargetDocument = default_impl_2.makeWriteTargetDocument({ filesHelper, cliLogger });
const actionConvert = action_convert_1.makeActionConvert({
    interpretGlob, debug, path, cliLogger, loadImplPkg,
    unConfiguredReadMdDocument,
    defaultImpl: {
        unConfiguredTokenizeMdDocument,
        parseLexeredDocument: default_impl_2.parseLexeredDocument,
        unConfiguredMapParsedDocument
    },
    writeTargetDocument
});
program
    .version(pkg.version, '-v, --version');
program
    .command('convert <implPkg> <globPattern>')
    .option('-d, --dest <path>', 'Specify an absolute or relative directory destination <path> for the converted file(s). <path> MUST exist.')
    .option('-f, --filename <filename>', 'When reducing to a single file, specify the filename <filename> (without extension which is defined in the impl pkg) for the converted file. ')
    .description('Convert the files grabbed by <globPattern> with the <implPkg> implementation package.')
    .action(actionConvert);
program.parse(process.argv);
const validCommands = program.commands.map((cmd) => {
    return cmd._name;
});
if (!program.args.length) {
    console.log(`${pkg.name} : `, pkg.homepage, '\n');
    program.help();
}
else if (validCommands.indexOf(process.argv[2]) === -1) {
    console.log('Invalid argument :', process.argv[2]);
    console.log(`${pkg.name} : `, pkg.homepage, '\n');
    program.help();
}
