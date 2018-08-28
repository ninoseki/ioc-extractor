# IOC extractor

[![Build Status](https://travis-ci.org/ninoseki/ioc-extractor.svg?branch=master)](https://travis-ci.org/ninoseki/ioc-extractor)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1e7e771f4b12e6415d1/maintainability)](https://codeclimate.com/github/ninoseki/ioc-extractor/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/ioc-extractor/badge.svg)](https://coveralls.io/github/ninoseki/ioc-extractor)

IOC extractor is a npm package for extracting common [IOC(Indicator of Compromise)](https://en.wikipedia.org/wiki/Indicator_of_compromise) from a block of text.

**Note**: the package is highly influenced by [cacador](https://github.com/sroberts/cacador).

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
//       "sha1s":[],
//       "sha256s":[],
//       "sha512s":[],
//       "ssdeeps":[]
//    },
//    "networks":{
//       "domains":[
//          "google.com"
//       ],
//       "emails":[],
//       "ipv4s":[
//          "1.1.1.1"
//       ],
//       "ipv6s":[],
//       "urls":[]
//    },
//    "files":{
//       "docs":[],
//       "exes":[],
//       "flashs":[],
//       "imgs":[],
//       "macs":[],
//       "webs":[],
//       "zips":[]
//    },
//    "utilities":{
//       "cves":[]
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

| Techniques       | Defanged                               | Refanged                        |
|:-----------------|:---------------------------------------|:--------------------------------|
| `[.]` => `.`     | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `(.)` => `.`     | `1.1.1(.)1`                            | `1.1.1.1`                       |
| `\.`  => `.`     | `example\.com`                         | `example.com`                   |
| `[/]` => `/`     | `http://example.com[/]path`            | `http://example.com/path`       |
| `[:]` => `:`     | `http[:]//example.com`                 | `http://example.com`            |
| `hxxp` => `http` | `hxxps://google.com`                   | `https://google.com`            |
| Partial          | `1.1.1[.1`                             | `1.1.1.1`                       |
| Any combination  | `hxxps[:]//test\.example[.)com[/]path` | `https://test.example.com/path` |
