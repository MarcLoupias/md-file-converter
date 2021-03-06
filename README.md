# md-file-converter

[![Build Status](https://travis-ci.org/MarcLoupias/md-file-converter.svg?branch=master)](https://travis-ci.org/MarcLoupias/md-file-converter)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/md-file-converter.svg)](http://badge.fury.io/js/md-file-converter)

This project is a CLI tool built on top of [marked](https://github.com/markedjs/marked) to ease his usage.

The CLI tool does nothing alone. It is used in conjunction of an implementation package.

This package details how marked is extended and how the markdown files are processed.

In others words, it implements what to do with the markdown files you want to process.

## prerequisites

You should read [the marked documentation](https://marked.js.org/#/README.md) and play with it before trying to use this tool to write an implementation package.

An implementation package should give enough details to use it directly without reading this documentation or the marked one.

## existing implementation packages

They are mostly packaged version of `tests/testing-impl-pkg/`, but they will probably diverge a lot in the future.

### simple markdown to html map

A very basic one is [mdfc-map-to-html](https://www.npmjs.com/package/mdfc-map-to-html). Just turns your markdown into html files.

### others examples

Others exists for a [developpez.com](https://www.developpez.com/) internal project that you could find useful as examples :

- [dvlp-news-bbcode](https://www.npmjs.com/package/dvlp-news-bbcode) map to `.bbcode` files
- [dvlp-faq-md-summary](https://www.npmjs.com/package/dvlp-faq-md-summary) reduce markdown files to a single `SUMMARY.md` file (a FAQ index).
- [dvlp-faq-xml](https://www.npmjs.com/package/dvlp-faq-xml) reduce markdown files to a single xml file. The last package must be used first in the hosting project to generate the FAQ summary.

## uses cases

The CLI tool apply first a **map** onto the markdown files based on the package implementation, then eventually it **reduce** the output into a single file.

Depending on the implementation package (see examples packages used to run the tests) you could want to :

- **map** markdown files to html files

```text
src-dir/dir-aaa/file-aaa.md ---> src-dir/dir-aaa/file-aaa.html
src-dir/dir-aaa/file-bbb.md ---> src-dir/dir-aaa/file-bbb.html
src-dir/dir-bbb/file-ccc.md ---> src-dir/dir-bbb/file-ccc.html
src-dir/dir-bbb/file-ddd.md ---> src-dir/dir-bbb/file-aaa.html
```

- **map** markdown files to html files then **reduce** them to a single html

```text
src-dir/dir-aaa/file-aaa.md ---> src-dir/dir-aaa/file-aaa.html ---+
src-dir/dir-aaa/file-bbb.md ---> src-dir/dir-aaa/file-bbb.html ---+
src-dir/dir-bbb/file-ccc.md ---> src-dir/dir-bbb/file-ccc.html ---+
src-dir/dir-bbb/file-ddd.md ---> src-dir/dir-bbb/file-aaa.html ---+
                                                                  |
                                                                  +---> index.html
```

In this case, the mapped html files are not written on the filesystem, they belongs in-memory until the final reduced file is written onto the filesystem.

## usage

```text
Usage: mdfc [options] [command]

Options:
  -v, --version                              output the version number
  -h, --help                                 output usage information

Commands:
  convert [options] <implPkg> <globPattern>  Convert the files grabbed by <globPattern> with the <implPkg> implementation package.
```

`<implPkg>` is the name of the package containing an implementation to run onto the files grabbed by the tool.

`<globPattern>` is a [`node-glob`](https://github.com/isaacs/node-glob#glob-primer) defining the files grabbed by the tool. Must be `.md` files.

Valid patterns : `'file.md'`, `'dir/file.md'`, `'/home/user/file.md'`, `'relative-dir/**/*.md'`.

```text
Usage: convert [options] <implPkg> <globPattern>

Convert the files grabbed by <globPattern> with the <implPkg> implementation package.

Options:
  -d, --dest <path>                                       Specify an absolute or relative directory destination <path> for the converted file(s). <path> MUST exist.
  -f, --filename <filename>                               When reducing to a single file, specity the filename <filename> (without extension which is defined in the impl pkg) for the converted file.
  -o, --overwrite-marked-options <markedOptionsFilePath>  Marked options set in the <markedOptionsFilePath> file overwrite the default options defined in the implementation package in use.
  -h, --help                                              output usage information
```

### `--dest` option

Notice that the source directory structure will not be created in the `dest` directory, all the files will be written in `dest` dir.

Example with a `<globPattern>` equal to `src-dir/**/*.md` and a `--dest <path>` equal to `out-dir/` :

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

will output to

```
out-dir/file-aaa.md
out-dir/file-bbb.md
out-dir/file-ccc.md
out-dir/file-ddd.md
```

### `--overwrite-marked-options` option

The file must be a vanilla JavaScript file with a CommonJS module export.

The file option must contains at least one valid property.

Validity is checked against [`MarkedOptions`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/marked/index.d.ts#L218) interface with a custom type guard.

There is one exception, the `renderer` property is forbidden. Implements a package or use an existing one to deal with that property.

A valid file could be :

```javascript
'use strict';

module.exports = {
    langPrefix: 'lang-',
    tables: true
};
```

This is not a bulk overwrite, the overwrite file is merged in the default setup.

For example if the default conf in the implementation package is :

```javascript
'use strict';

module.exports = {
    langPrefix: '',
    smartypants: true,
    gfm: true,
    breaks: true
};
```

and the overwrite file is

```javascript
'use strict';

module.exports = {
    langPrefix: 'lang-',
    tables: true
};
``` 

The final marked options becomes :

```javascript
'use strict';

module.exports = {
    langPrefix: 'lang-',
    smartypants: true,
    gfm: true,
    breaks: true,
    tables: true
};
```

## general algorithm

1. interpret the glob : `(globPattern) => filePathList`
  - IF NOT `.md` throws Error
  - build the `filePathList`

2. load the implementation package
  - IF `IImplPkgBasic` is NOT implemented throws Error

3. configuration
  - configure marked options with loaded impl
  - configure the tool with loaded impl (checks implemented package contracts interfaces : `IImplPkgBasic` (mandatory), `IImplPkgParser`, `IImplPkgMapper`, and `IImplPkgReducer`.

4. execution
- **load markdown files** : map `filePathList` to `MdDocumentList`
- **tokenize the markdown files** : map `MdDocumentList` to `MdLexeredDocumentList`
- **parsing** : map `MdLexeredDocumentList` to `MdParsedDocumentList`
- **rendering** :
    - map `MdParsedDocumentList` to `TargetDocumentList`
    - OR map `MdParsedDocumentList` to `TargetDocumentToReduceList` then reduce `TargetDocumentToReduceList` to `TargetDocument`

5. write output
- **write target(s) file(s)** : write `TargetDocumentList` (case only map) or `TargetDocument` (case map then reduce)

### types

See `typings/index.d.ts`.

There is 2 types groups :

- the documents definitions
- the implementation packages contracts

You should also check [marked typings](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/marked/index.d.ts).

### implementation package contract

**`IImplPkgBasic`** is mandatory. It implements the target (output) files extension and the marked configuration.

Extends marked and especially his renderer here. See [marked documentation](https://marked.js.org/#/USING_PRO.md).

**`IImplPkgParser`** is optional. If not implemented, the default impl (`src/model/action-convert/parse-lexered-document.ts`) is taken.

Here you can work on the tokens created by the marked lexer.

You should also deals here with the front-matter data. See the `tests/testing-impl-pkg/map-to-xml` for example.

See also `tests/testing-impl-pkg/common/dvlp-model/front-matter` for a front-matter model implementation.

The idea is to use classes getters and setters to format the front-matter data gathered.

**`IImplPkgMapper`** is optional. If not implemented, the default impl (`src/model/action-convert/map-parsed-document.ts`) is taken.

The format transformation occurs here. A document is writable on the filesystem after this step.

**`IImplPkgReducer`** is optional. If not implemented, nothing is done here.

The mapped documents could be reduced into one or several documents here

See `tests/testing-impl-pkg/map-reduce-to-xml` and `tests/testing-impl-pkg/map-reduce-to-md` for examples.

### implementation packages examples details

They can be found in `tests/testing-impl-pkg` directory.

- `tests/testing-impl-pkg/map-to-bbcode`

Implements only `IImplPkgBasic`.

It maps markdown files to BBCode files with that configuration.

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

run with `mdfc convert 'tests/testing-impl-pkg/map-to-bbcode' 'src-dir/**/.md'`

will output :

```
src-dir/dir-aaa/file-aaa.bbcode
src-dir/dir-aaa/file-bbb.bbcode
src-dir/dir-bbb/file-ccc.bbcode
src-dir/dir-bbb/file-ddd.bbcode
```

- `tests/testing-impl-pkg/map-to-html`

Implements `IImplPkgBasic` and `IImplPkgMapper`.

Generate valid html files (with doctype, html tag, head, body, etc ...).

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

run with `mdfc convert 'tests/testing-impl-pkg/map-to-html' 'src-dir/**/.md'`

will output :

```
src-dir/dir-aaa/file-aaa.html
src-dir/dir-aaa/file-bbb.html
src-dir/dir-bbb/file-ccc.html
src-dir/dir-bbb/file-ddd.html
```

- `tests/testing-impl-pkg/map-to-xml`

Implements `IImplPkgBasic`, `IImplPkgParser` and `IImplPkgMapper`.

Makes use of front-matter data. Map markdown files to xml files.

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

run with `mdfc convert 'tests/testing-impl-pkg/map-to-xml' 'src-dir/**/.md'`

will output :

```
src-dir/dir-aaa/file-aaa.xml
src-dir/dir-aaa/file-bbb.xml
src-dir/dir-bbb/file-ccc.xml
src-dir/dir-bbb/file-ddd.xml
```

- `tests/testing-impl-pkg/map-reduce-to-xml`

Implements all the availables contracts (`IImplPkgBasic`, `IImplPkgParser`, `IImplPkgMapper` and `IImplPkgReducer`).

Same as the last, but reduce the files to a single xml file.

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

run with `mdfc convert 'tests/testing-impl-pkg/map-reduce-to-xml' 'src-dir/**/.md' --filename 'map-reduce-to-xml'`

will output :

```
map-reduce-to-xml.xml
```

- `tests/testing-impl-pkg/map-reduce-to-md`

Implements all the availables contracts (`IImplPkgBasic`, `IImplPkgParser`, `IImplPkgMapper` and `IImplPkgReducer`).

Based on the same markdown files as the 2 lasts examples.

The goal here is to generate a `SUMMARY.md` file with front-matter data.

```
src-dir/dir-aaa/file-aaa.md
src-dir/dir-aaa/file-bbb.md
src-dir/dir-bbb/file-ccc.md
src-dir/dir-bbb/file-ddd.md
```

run with `mdfc convert 'tests/testing-impl-pkg/map-reduce-to-md' 'src-dir/**/.md' --filename 'SUMMARY'`

will output :

```
SUMMARY.md
```
