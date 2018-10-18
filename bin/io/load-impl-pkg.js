'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function makeLoadImplPkg(deps) {
    return (implPkg) => {
        try {
            return deps.require(implPkg).default;
        }
        catch (e) {
            deps.cliLogger.logErrorNoImplForTheGivenImplPkgPath(implPkg);
            process.exitCode = 1;
            throw new Error(e);
        }
    };
}
exports.makeLoadImplPkg = makeLoadImplPkg;
