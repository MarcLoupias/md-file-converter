'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const fsp = require('fs').promises;
const { executeCliSync } = require('../test-utils');

describe('command with option --overwrite-marked-options :: "md-file-converter convert <implPkg> <globPattern>" --overwrite-marked-options <markedOptionsFilePath>"', function () {
    context('command with option -o :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-html\' \'tests/actual-files/news/test-news.md\' -o \'../tests/actual-files/option-o/marked-options.js\'"', function() {
        let result;

        beforeEach(function() {
            result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-html', 'tests/actual-files/news/test-news.md', '-o', '../tests/actual-files/option-o/marked-options.js']);
            expect(result.stdout).to.include('tests/actual-files/news/test-news.html');
            expect(result.stdout).to.include('Processing files done.');
        });

        it('should output a final html file with a content equal to tests/expected-files/option-o/test-news.html (overwrite language prefix with "lang-")', async () => {
            const results = await Promise.all([
                fsp.readFile('tests/actual-files/news/test-news.html', { encoding: 'utf-8' }),
                fsp.readFile('tests/expected-files/option-o/test-news.html', { encoding: 'utf-8' })
            ]);
            expect(results[0]).to.equal(results[1]);
        });

        afterEach(function() {
            fs.unlinkSync('tests/actual-files/news/test-news.html');
        });
    });

    context('command with option -o :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-html\' \'tests/actual-files/news/test-news.md\' -o \'unknown/path/marked-options.js\'"', function() {
        it('should return "ENOENT: no such file or directory, open \'unknown/path/marked-options.js\'" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-html', 'tests/actual-files/news/test-news.md', '-o', 'unknown/path/marked-options.js'], false);
            expect(result.stderr).to.include('No marked options file found for the given path unknown/path/marked-options.js');
        });
    });

    context('command with option -o :: "md-file-converter convert \'./tests/testing-impl-pkg/map-to-html\' \'tests/actual-files/news/test-news.md\' -o"', function() {
        it('should return "error: option \'-o, --overwrite-marked-options <markedOptionsFilePath>\' argument missing" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-html', 'tests/actual-files/news/test-news.md', '-o'], false);
            expect(result.stderr).to.include('error: option \'-o, --overwrite-marked-options <markedOptionsFilePath>\' argument missing');
        });
    });

    context('command with option -o :: "md-file-converter convert \'./tests/testing-impl-pkg/map-to-html\' \'tests/actual-files/news/test-news.md\' -o \'../tests/actual-files/option-o/invalid-marked-options.js\'"', function() {
        it('should return "Error: Invalid MarkedOptions file to overwrite implementation package default options. Should contains at least one valid property." error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-html', 'tests/actual-files/news/test-news.md', '-o', '../tests/actual-files/option-o/invalid-marked-options.js'], false);
            expect(result.stderr).to.include('Error: Invalid MarkedOptions file to overwrite implementation package default options. Should contains at least one valid property.');
        });
    });

    context('command with option -o :: "md-file-converter convert \'./tests/testing-impl-pkg/map-to-html\' \'tests/actual-files/news/test-news.md\' -o \'../tests/actual-files/option-o/invalid-marked-options-with-renderer.js\'"', function() {
        it('should return "Error: Invalid MarkedOptions file to overwrite implementation package default options. Overwriting the renderer property is forbidden." error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-html', 'tests/actual-files/news/test-news.md', '-o', '../tests/actual-files/option-o/invalid-marked-options-with-renderer.js'], false);
            expect(result.stderr).to.include('Error: Invalid MarkedOptions file to overwrite implementation package default options. Overwriting the renderer property is forbidden.');
        });
    });
});
