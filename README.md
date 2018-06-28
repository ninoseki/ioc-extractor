# IOC extractor

[![Build Status](https://travis-ci.org/ninoseki/ioc-extractor.svg?branch=master)](https://travis-ci.org/ninoseki/ioc-extractor)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1e7e771f4b12e6415d1/maintainability)](https://codeclimate.com/github/ninoseki/ioc-extractor/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d1e7e771f4b12e6415d1/test_coverage)](https://codeclimate.com/github/ninoseki/ioc-extractor/test_coverage)

IOC extractor is a npm package for extracting common [IOC(Indicator of Compromise)](https://en.wikipedia.org/wiki/Indicator_of_compromise) from a block of text.

**Note**: the package is highly infuluenced by [cacador](https://github.com/sroberts/cacador).

## Installation

```sh
npm install ioc-extractor
```

## Usage

```ts
var iocExtractor = require("ioc-extractor")

const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b';
const ioc = iocExtractor.getIOC(input);
console.log(ioc.hashes.md5s);      // => ['f6f8179ac71eaabff12b8c024342109b']
console.log(ioc.networks.ipv4s);   // => ['1.1.1.1']
console.log(ioc.networks.domains); // => ['google.com']

console.log(JSON.stringify(ioc));
// {
//    "hashes":{
//       "md5s":[
//          "f6f8179ac71eaabff12b8c024342109b"
//       ],
//       "sha1s":null,
//       "sha256s":null,
//       "sha512s":null,
//       "ssdeeps":null
//    },
//    "networks":{
//       "domains":[
//          "google.com"
//       ],
//       "emails":null,
//       "ipv4s":[
//          "1.1.1.1"
//       ],
//       "ipv6s":null,
//       "urls":null
//    },
//    "files":{
//       "docs":null,
//       "exes":null,
//       "flashs":null,
//       "imgs":null,
//       "macs":null,
//       "webs":null,
//       "zips":null
//    },
//    "utilities":{
//       "cves":null
//    }
// }
```

## Details

This package supports the following IOCs:

- **Hashes**: md5, sha1, sha256, sha512, ssdeep
- **Networks**: domain, email, ipv4, ipv6, url
- **Files**: doc, exe, flash, img, mac, web, zip
- **Utilities**: cve

For **Networks** IOCs, the following defang techniques are supported:

|Techniques|Defanged|Refanged|
|---|---|---|
|`[.] => .`|1.1.1[.]1|1.1.1.1|
|`(.) => .`|1.1.1(.)1|1.1.1.1|
|Partial|1.1.1[.1|1.1.1.1|
|Any combination|1.1.1[.)1|1.1.1.1|
