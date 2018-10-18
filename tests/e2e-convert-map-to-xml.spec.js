'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const fsp = require('fs').promises;
const { executeCliSync } = require('../test-utils');

describe('command :: "md-file-converter convert \'../tests/testing-impl-pkg/map-to-xml\' \'tests/actual-files/faq/**/*.md\'"', function () {
    beforeEach(function() {
        const result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-to-xml', 'tests/actual-files/faq/**/*.md']);
        expect(result.stdout).to.include('Processing files done.');
    });

    it('should output qa and summary files in xml format with a content equal to the files located in tests/expected/map-to-xml/faq/', async () => {
        const results = await Promise.all([
            fsp.readFile('tests/actual-files/faq/SUMMARY.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/SUMMARY.xml', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-001/001.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-001/001.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-001/001.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-001/001.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-001/001.q003.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-001/001.q003.xml', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-002/002.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-002/002.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-002/002.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-002/002.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-002/002.q003.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-002/002.q003.xml', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-003/003.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-003/003.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-003/003.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-003/003.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-003/003.q003.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-003/003.q003.xml', { encoding: 'utf-8' }),

            fsp.readFile('tests/actual-files/faq/section-004/004.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-004/004.q001.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-004/004.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-004/004.q002.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/actual-files/faq/section-004/004.q003.xml', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-to-xml/faq/section-004/004.q003.xml', { encoding: 'utf-8' })
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
        fs.unlinkSync('tests/actual-files/faq/SUMMARY.xml');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q001.xml');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q002.xml');
        fs.unlinkSync('tests/actual-files/faq/section-001/001.q003.xml');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q001.xml');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q002.xml');
        fs.unlinkSync('tests/actual-files/faq/section-002/002.q003.xml');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q001.xml');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q002.xml');
        fs.unlinkSync('tests/actual-files/faq/section-003/003.q003.xml');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q001.xml');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q002.xml');
        fs.unlinkSync('tests/actual-files/faq/section-004/004.q003.xml');
    });
});
