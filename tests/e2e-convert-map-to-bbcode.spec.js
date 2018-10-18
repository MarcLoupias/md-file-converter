'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const fsp = require('fs').promises;
const { executeCliSync } = require('../test-utils');

describe('command :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/news/test-news.md\'"', function () {
    let result;

    beforeEach(function() {
        result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/news/test-news.md']);
        expect(result.stdout).to.include('tests/actual-files/news/test-news.bbcode');
        expect(result.stdout).to.include('Processing files done.');
    });

    it('should output a final bbcode file with a content equal to tests/expected-files/map-to-bbcode/news/test-news.bbcode content', async () => {
        const results = await Promise.all([
            fsp.readFile('tests/actual-files/news/test-news.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/news/test-news.bbcode', { encoding: 'utf-8' })
        ]);
        expect(results[0]).to.equal(results[1]);
    });

    afterEach(function() {
        fs.unlinkSync('tests/actual-files/news/test-news.bbcode');
    });
});

describe('command :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-bbcode\' \'tests/actual-files/faq/**/*.md\'"', function () {
    beforeEach(function() {
        const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-bbcode', 'tests/actual-files/faq/**/*.md']);
        expect(result.stdout).to.include('Processing files done.');
    });

    it('should output qa and summary files in bbocde format with a content equal to the files located in tests/expected/map-to-bbcode/faq/', async () => {
        const results = await Promise.all([
            fsp.readFile('tests/actual-files/faq/SUMMARY.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/SUMMARY.bbcode', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-001/001.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-001/001.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-001/001.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-001/001.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-001/001.q003.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-001/001.q003.bbcode', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-002/002.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-002/002.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-002/002.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-002/002.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-002/002.q003.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-002/002.q003.bbcode', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-003/003.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-003/003.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-003/003.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-003/003.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-003/003.q003.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-003/003.q003.bbcode', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-004/004.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-004/004.q001.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-004/004.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-004/004.q002.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-004/004.q003.bbcode', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-bbcode/faq/section-004/004.q003.bbcode', { encoding: 'utf-8' })
        ]);
        expect(results[0]).to.equal(results[1]);

        expect(results[2]).to.equal(results[3]);
        expect(results[4]).to.equal(results[5]);
        expect(results[6]).to.equal(results[7]);

        expect(results[8]).to.equal(results[9]);
        expect(results[10]).to.equal(results[11]);
        expect(results[12]).to.equal(results[13]);

        expect(results[14]).to.equal(results[15]);
        expect(results[16]).to.equal(results[17]);
        expect(results[18]).to.equal(results[19]);

        expect(results[20]).to.equal(results[21]);
        expect(results[22]).to.equal(results[23]);
        expect(results[24]).to.equal(results[25]);
    });

    afterEach(function() {
        fs.unlinkSync('tests/actual-files/faq/SUMMARY.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q001.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q002.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q003.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q001.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q002.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q003.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q001.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q002.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q003.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q001.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q002.bbcode');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q003.bbcode');
    });
});
