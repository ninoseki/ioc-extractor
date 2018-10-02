# IOC extractor

[![npm version](https://badge.fury.io/js/ioc-extractor.svg)](https://badge.fury.io/js/ioc-extractor)
[![Build Status](https://travis-ci.org/ninoseki/ioc-extractor.svg?branch=master)](https://travis-ci.org/ninoseki/ioc-extractor)
[![Maintainability](https://api.codeclimate.com/v1/badges/d1e7e771f4b12e6415d1/maintainability)](https://codeclimate.com/github/ninoseki/ioc-extractor/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/ioc-extractor/badge.svg)](https://coveralls.io/github/ninoseki/ioc-extractor)

IOC extractor is an npm package for extracting common [IOC(Indicator of Compromise)](https://en.wikipedia.org/wiki/Indicator_of_compromise) from a block of text.

**Note**: the package is highly influenced by [cacador](https://github.com/sroberts/cacador).

## Installation

```sh
npm install ioc-extractor
```

## Usage

### As a CLI

```sh
$ echo "1.1.1.1 8.8.8.8 example.com " | ioc-extractor
# {"cryptocurrencies":{"btcs":[],"xmrs":[]},"files":{"docs":[],"exes":[],"flashes":[],"imgs":[],"macs":[],"webs":[],"zips":[]},"hashes":{"md5s":[],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[]},"networks":{"domains":["example.com"],"emails":[],"ipv4s":["1.1.1.1","8.8.8.8"],"ipv6s":[],"urls":[]},"utilities":{"cves":[]}}

# I recommend using it with jq
$ echo "1.1.1.1 8.8.8.8 example.com " | ioc-extractor | jq .networks
# {
#   "domains": [
#     "example.com"
#   ],
#   "emails": [],
#   "ipv4s": [
#     "1.1.1.1",
#     "8.8.8.8"
#   ],
#   "ipv6s": [],
#   "urls": []
# }
```

### As a library

```ts
var iocExtractor = require("ioc-extractor")

const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b';
const ioc = iocExtractor.getIOC(input);
console.log(ioc.hashes.md5s);      // => ['f6f8179ac71eaabff12b8c024342109b']
console.log(ioc.networks.ipv4s);   // => ['1.1.1.1']
console.log(ioc.networks.domains); // => ['google.com']

console.log(JSON.stringify(ioc));
// {
//   "cryptocurrencies": {
//     "btcs": [],
//     "xmrs": []
//   },
//   "files": {
//     "docs": [],
//     "exes": [],
//     "flashes": [],
//     "imgs": [],
//     "macs": [],
//     "webs": [],
//     "zips": []
//   },
//   "hashes": {
//     "md5s": [
//       "f6f8179ac71eaabff12b8c024342109b"
//     ],
//     "sha1s": [],
//     "sha256s": [],
//     "sha512s": [],
//     "ssdeeps": []
//   },
//   "networks": {
//     "domains": [
//       "google.com"
//     ],
//     "emails": [],
//     "ipv4s": [
//       "1.1.1.1"
//     ],
//     "ipv6s": [],
//     "urls": []
//   },
//   "utilities": {
//     "cves": []
//   }
// }
```

## Details

This package supports the following IOCs:

- **Hashes**: md5, sha1, sha256, sha512, ssdeep
- **Networks**: domain, email, ipv4, ipv6, url
- **Files**: doc, exe, flash, img, mac, web, zip
- **Utilities**: cve
- **Cryptocurrencies**: btc, xmr

For **Networks** IOCs, the following defang/refang techniques are supported:

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
