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

```bash
$ echo "1.1.1.1 8.8.8.8 example.com" | ioc-extractor
{"asns":[],"btcs":[],"cves":[],"domains":["example.com"],"emails":[],"gaPubIDs":[],"gaTrackIDs":[],"ipv4s":["1.1.1.1","8.8.8.8"],"ipv6s":[],"md5s":[],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[],"urls":[],"xmrs":[]}

# Using it with jq
$ echo "1.1.1.1 8.8.8.8 example.com " | ioc-extractor | jq
{
  "asns": [],
  "btcs": [],
  "cves": [],
  "domains": [
    "example.com"
  ],
  "emails": [],
  "gaPubIDs": [],
  "gaTrackIDs": [],
  "ipv4s": [
    "1.1.1.1",
    "8.8.8.8"
  ],
  "ipv6s": [],
  "md5s": [],
  "sha1s": [],
  "sha256s": [],
  "sha512s": [],
  "ssdeeps": [],
  "urls": [],
  "xmrs": []
}
```

### As a library

```ts
var iocExtractor = require("ioc-extractor")

const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b';
const ioc = iocExtractor.getIOC(input);
console.log(ioc.md5s);
// => ['f6f8179ac71eaabff12b8c024342109b']
console.log(ioc.ipv4s);
// => ['1.1.1.1']
console.log(ioc.domains);
// => ['google.com']

console.log(JSON.stringify(ioc))
// => {"asns":[],"btcs":[],"cves":[],"domains":["google.com"],"emails":[],"gaPubIDs":[],"gaTrackIDs":[],"ipv4s":["1.1.1.1"],"ipv6s":[],"md5s":["f6f8179ac71eaabff12b8c024342109b"],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[],"urls":[],"xmrs":[]}
```

## Details

This package supports the following IOCs:

- **Hashes**: md5, sha1, sha256, sha512, ssdeep
- **Networks**: domain, email, ipv4, ipv6, url, asn
- **Utilities**: cve(CVE ID)
- **Cryptocurrencies**: btc (BTC address), xmr (XMR address)
- **Trackers**: gaTrackID (Google Analytics tracking ID), gaPubID (Google Adsense Publisher ID)

For **Networks** IOCs, the following defang/refang techniques are supported:

| Techniques       | Defanged                               | Refanged                        |
|------------------|----------------------------------------|---------------------------------|
| `[.]` => `.`     | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `(.)` => `.`     | `1.1.1(.)1`                            | `1.1.1.1`                       |
| `\.`  => `.`     | `example\.com`                         | `example.com`                   |
| `[/]` => `/`     | `http://example.com[/]path`            | `http://example.com/path`       |
| `[:]` => `:`     | `http[:]//example.com`                 | `http://example.com`            |
| `hxxp` => `http` | `hxxps://google.com`                   | `https://google.com`            |
| `[at]` => `@`    | `test[at]example.com`                  | `test@example.com`              |
| `[@]` => `@`     | `test[@]example.com`                   | `test@example.com`              |
| `(@)` => `@`     | `test(@)example.com`                   | `test@example.com`              |
| Partial          | `1.1.1[.1`                             | `1.1.1.1`                       |
| Any combination  | `hxxps[:]//test\.example[.)com[/]path` | `https://test.example.com/path` |

## Alternatives

- Python:
  - [InQuest/python-iocextract](https://github.com/InQuest/python-iocextract)
  - [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract)
  - [fhightower/ioc-finder](https://github.com/fhightower/ioc-finder)
- Golang:
  - [sroberts/cacador](https://github.com/sroberts/cacador)
