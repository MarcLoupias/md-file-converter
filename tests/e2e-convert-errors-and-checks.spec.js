'use strict';

const expect = require('chai').expect;
const { executeCliSync } = require('../test-utils');

describe('command :: "md-file-converter convert <implPkg> <globPattern>"', function () {
    context('"md-file-converter convert" (<implPkg> is required)', function() {
        it('should return "missing required argument" error', () => {
            const result = executeCliSync(['convert'], false);
            expect(result.stderr).to.include('missing required argument');
        });

        it('should name the "implPkg" missing required argument', () => {
            const result = executeCliSync(['convert'], false);
            expect(result.stderr).to.include('implPkg');
        });
    });

    context('"md-file-converter convert \'fake-impl\'" (<globPattern> is required)', function() {
        it('should return "missing required argument" error', () => {
            const result = executeCliSync(['convert', 'fake-impl'], false);
            expect(result.stderr).to.include('missing required argument');
        });

        it('should name the "globPattern" missing required argument', () => {
            const result = executeCliSync(['convert', 'fake-impl'], false);
            expect(result.stderr).to.include('globPattern');
        });
    });

    context('"md-file-converter convert \'unknown-impl\' \'tests/actual-files/news/test-news.md\'"', function() {
        it('should return "No implementation package found for the given path" error', () => {
            const result = executeCliSync(['convert', 'unknown-impl', 'tests/actual-files/news/test-news.md'], false);
            expect(result.stderr).to.include('No implementation package found for the given path');
        });
    });

    context('"md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/missing/missing.md\'"', function() {
        it('should return "No matching files for the fulfilled pattern tests/actual-files/missing/missing.md" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/missing/missing.md'], false);
            expect(result.stderr).to.include('No matching files for the fulfilled pattern tests/actual-files/missing/missing.md.');
        });
    });

    context('"md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/news/*.*\'"', function() {
        it('should return "The fulfilled pattern must catch .md files only : tests/actual-files/news/*.*" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/news/*.*'], false);
            expect(result.stderr).to.include('The fulfilled pattern must catch .md files only : tests/actual-files/news/*.*.');
        });
    });

    context('"md-file-converter convert \'../tests/testing-impl-pkg/invalid-impl-pkg\' \'tests/actual-files/news/test-news.md\'"', function() {
        it('should return "Invalid package. Implementing IImplPkgBasic interface is mandatory." error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/invalid-impl-pkg', 'tests/actual-files/news/test-news.md'], false);
            expect(result.stderr).to.include('Invalid package. Implementing IImplPkgBasic interface is mandatory.');
        });
    });
});
