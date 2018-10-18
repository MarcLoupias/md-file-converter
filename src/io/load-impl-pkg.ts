'use strict';

import { CliLogger } from './cli-logger';

export type LoadImplPkgFnType = (implPkg: string) => unknown;

export function makeLoadImplPkg(deps: { process: any, require: NodeRequireFunction, cliLogger: CliLogger }): LoadImplPkgFnType {
    return (implPkg: string): unknown => {
        try {
            return deps.require(implPkg).default;

        } catch (e) {
            deps.cliLogger.logErrorNoImplForTheGivenImplPkgPath(implPkg);
            process.exitCode = 1;
            throw new Error(e);
        }
    };
}
