'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const fsp = require('fs').promises;
const { executeCliSync } = require('../test-utils');

describe('command :: "md-file-converter convert \'../tests/testing-impl-pkg/map-reduce-to-md\' \'tests/actual-files/faq/**/*.md\'"', function () {
    let result;

    beforeEach(function() {
        result = executeCliSync(['convert', '../tests/testing-impl-pkg/map-reduce-to-md', 'tests/actual-files/faq/**/*.md']);
        expect(result.stdout).to.include('default-target-document-filename.md');
    });

    it('should output a final markdown file named "default-target-document-filename.md" with a content equal to tests/expected-files/map-reduce-to-md/SUMMARY.md content', async () => {
        const results = await Promise.all([
            fsp.readFile('default-target-document-filename.md', { encoding: 'utf-8' }),
            fsp.readFile('tests/expected-files/map-reduce-to-md/SUMMARY.md', { encoding: 'utf-8' })
        ]);
        expect(results[0]).to.equal(results[1]);
    });

    afterEach(function() {
        fs.unlinkSync('default-target-document-filename.md');
    });
});
