'use strict';

const expect = require('chai').expect;
const pkg = require('../package.json');
const { executeCliSync } = require('../test-utils');

describe('option :: md-file-converter --version', function () {
    context('"md-file-converter -v"', function() {
        it('should return the package version number', () => {
            const result = executeCliSync(['-v']);
            expect(result.stdout).to.include(`${pkg.version}`);
        });
    });

    context('"md-file-converter --version"', function() {
        it('should return the package version number', () => {
            const result = executeCliSync(['--version']);
            expect(result.stdout).to.include(`${pkg.version}`);
        });
    });
});