'use strict';

const spawnSync = require('child_process').spawnSync;
const process = require('process');
const assert = require('assert');

function executeSync(processPath, args = [], opts = {}) {
    return spawnSync(processPath, args, opts);
}

function executeCliSync(args, throwIfStdErr = true) {
    assert.ok(Array.isArray(args));

    const result = executeSync(
        (process.env.DEV_MODE) ? './dist/index.js' : './bin/index.js',
        args,
        { encoding: 'utf-8' }
    );

    if (throwIfStdErr && result.stderr) {
        throw new Error(result.stderr);
    }

    return result;
}

module.exports = { executeCliSync };
