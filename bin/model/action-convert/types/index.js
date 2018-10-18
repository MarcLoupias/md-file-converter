'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function implementIImplPkgBasic(pkg) {
    return ('targetDocumentFileExtension' in pkg && typeof pkg.targetDocumentFileExtension === 'string' &&
        'markedOptions' in pkg && typeof pkg.markedOptions === 'object');
}
exports.implementIImplPkgBasic = implementIImplPkgBasic;
function implementIImplPkgParser(pkg) {
    return ('parseLexeredDocument' in pkg && typeof pkg.parseLexeredDocument === 'function');
}
exports.implementIImplPkgParser = implementIImplPkgParser;
function implementIImplPkgMapper(pkg) {
    return ('unConfiguredMapParsedDocument' in pkg && typeof pkg.unConfiguredMapParsedDocument === 'function');
}
exports.implementIImplPkgMapper = implementIImplPkgMapper;
function implementIImplPkgReducer(pkg) {
    return ('getReducerConf' in pkg && typeof pkg.getReducerConf === 'function' &&
        'reduceTargetDocumentList' in pkg && typeof pkg.reduceTargetDocumentList === 'function');
}
exports.implementIImplPkgReducer = implementIImplPkgReducer;
