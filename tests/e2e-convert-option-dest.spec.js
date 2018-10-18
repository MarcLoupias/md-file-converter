'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const fsp = require('fs').promises;
const { executeCliSync } = require('../test-utils');

describe('command with option --dest :: "md-file-converter convert <implPkg> <globPattern>" --dest <path>"', function () {
    context('command with option --dest :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/news/test-news.md\' --dest \'tests/\'"', function() {
        let result;

        beforeEach(function() {
            result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/news/test-news.md', '--dest', 'tests/']);
            expect(result.stdout).to.include('tests/test-news.bbcode');
            expect(result.stdout).to.include('Processing files done.');
        });

        it('should output a final bbcode file with a content equal to tests/expected-files/map-to-bbcode/news/test-news.bbcode content in the path given with the --dest option', async () => {
            const results = await Promise.all([
                fsp.readFile('tests/test-news.bbcode', { encoding: 'utf-8' }),
                fsp.readFile('tests/expected-files/map-to-bbcode/news/test-news.bbcode', { encoding: 'utf-8' })
            ]);
            expect(results[0]).to.equal(results[1]);
        });

        afterEach(function() {
            fs.unlinkSync('tests/test-news.bbcode');
        });
    });

    context('command with option --dest :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/news/test-news.md\' --dest \'unknown/path/\'"', function() {
        it('should return "ENOENT: no such file or directory, open \'unknown/path/test-news.bbcode\'" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/news/test-news.md', '--dest', 'unknown/path/'], false);
            expect(result.stderr).to.include('ENOENT: no such file or directory, open \'unknown/path/test-news.bbcode\'');
        });
    });

    context('command with option --dest :: "md-file-converter convert \'./tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/news/test-news.md\' --dest"', function() {
        it('should return "error: option `-d, --dest <path>\' argument missing" error', () => {
            const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/news/test-news.md', '--dest'], false);
            expect(result.stderr).to.include('error: option `-d, --dest <path>\' argument missing');
        });
    });
});

