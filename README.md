# IOC extractor

[![npm version](https://badge.fury.io/js/ioc-extractor.svg)](https://badge.fury.io/js/ioc-extractor)
[![Build Status](https://travis-ci.com/ninoseki/ioc-extractor.svg?branch=master)](https://travis-ci.com/ninoseki/ioc-extractor)
[![CodeFactor](https://www.codefactor.io/repository/github/ninoseki/ioc-extractor/badge)](https://www.codefactor.io/repository/github/ninoseki/ioc-extractor)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/ioc-extractor/badge.svg)](https://coveralls.io/github/ninoseki/ioc-extractor)
[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://ninoseki.github.io/ioc-extractor/)

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
{"asns":[],"btcs":[],"cves":[],"domains":["example.com"],"emails":[],"gaPubIDs":[],"gaTrackIDs":[],"ipv4s":["1.1.1.1","8.8.8.8"],"ipv6s":[],"macAddresses":[],"md5s":[],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[],"urls":[],"xmrs":[]}

# Using with jq
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
  "macAddresses": [],
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
import { extractIOC } from "ioc-extractor";

const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b';
const ioc = extractIOC(input);
console.log(ioc.md5s);
// => ['f6f8179ac71eaabff12b8c024342109b']
console.log(ioc.ipv4s);
// => ['1.1.1.1']
console.log(ioc.domains);
// => ['google.com']

console.log(JSON.stringify(ioc))
// => {"asns":[],"btcs":[],"cves":[],"domains":["google.com"],"emails":[],"gaPubIDs":[],"gaTrackIDs":[],"ipv4s":["1.1.1.1"],"ipv6s":[],"macAddresses":[],"md5s":["f6f8179ac71eaabff12b8c024342109b"],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[],"urls":[],"xmrs":[]}
```

If you want to extract a specific type of IOC, you can use `extractXXX` function.

```ts
import { refang, extractDomain, extractIPv4, extractMD5 } from "ioc-extractor";

const input = "1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b";
const refanged = refang(input);
// => 1.1.1.1 google.com f6f8179ac71eaabff12b8c024342109b

const ipv4s = extractIPv4(refanged);
// => ['1.1.1.1']

const domains = extractDomain(refanged);
// => ['google.com']

const md5s = extractMD5(refanged);
// => ['f6f8179ac71eaabff12b8c024342109b']
```

See [docs](https://ninoseki.github.io/ioc-extractor/) for more details.

## Details

This package supports the following IOCs:

- **Hashes**: md5, sha1, sha256, sha512, ssdeep
- **Networks**: domain, email, ipv4, ipv6, url, asn
- **Hardwares**: mac address
- **Utilities**: cve(CVE ID)
- **Cryptocurrencies**: btc (BTC address), xmr (XMR address)
- **Trackers**: gaTrackID (Google Analytics tracking ID), gaPubID (Google Adsense Publisher ID)

For **Networks** IOCs, the following defang/refang techniques are supported:

| Techniques       | Defanged                               | Refanged                        |
|------------------|----------------------------------------|---------------------------------|
| `[.]` => `.`     | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `(.)` => `.`     | `1.1.1(.)1`                            | `1.1.1.1`                       |
| `{.}` => `.`     | `1.1.1{.}1`                            | `1.1.1.1`                       |
| `\.`  => `.`     | `example\.com`                         | `example.com`                   |
| `[/]` => `/`     | `http://example.com[/]path`            | `http://example.com/path`       |
| `[:]` => `:`     | `http[:]//example.com`                 | `http://example.com`            |
| `hxxp` => `http` | `hxxps://google.com`                   | `https://google.com`            |
| `[at]` => `@`    | `test[at]example.com`                  | `test@example.com`              |
| `[@]` => `@`     | `test[@]example.com`                   | `test@example.com`              |
| `(@)` => `@`     | `test(@)example.com`                   | `test@example.com`              |
| `{@}` => `@`     | `test{@}example.com`                   | `test@example.com`              |
| `[dot]` => `.`   | `test@example[dot]com`                 | `test@example.com`              |
| `(dot)` => `.`   | `test@example(dot)com`                 | `test@example.com`              |
| `{dot}` => `.`   | `test@example{dot}com`                 | `test@example.com`              |
| Partial          | `1.1.1[.1`                             | `1.1.1.1`                       |
| Any combination  | `hxxps[:]//test\.example[.)com[/]path` | `https://test.example.com/path` |

## SITX2 support

This package provides a partial support of STIX2 format.

```bash
$ echo "1.1.1.1 8.8.8.8 example.com" | ioc-extractor --sitx2 | jq
{
  "spec_version": "2.0",
  "type": "bundle",
  "objects": [
    {
      "type": "indicator",
      "id": "indicator--e0dc210b-fc7e-4dcc-8a5e-a220b32bd070",
      "created": "2019-09-07T12:40:13.104Z",
      "modified": "2019-09-07T12:40:13.104Z",
      "labels": [
        "malicious-activity"
      ],
      "pattern": "[ipv4-addr:value = '1.1.1.1']",
      "valid_from": "2019-09-07T12:40:13.104Z"
    },
    {
      "type": "indicator",
      "id": "indicator--f77971ea-37de-4ddb-a147-613fec3401b3",
      "created": "2019-09-07T12:40:13.104Z",
      "modified": "2019-09-07T12:40:13.104Z",
      "labels": [
        "malicious-activity"
      ],
      "pattern": "[domain-name:value = 'google.com']",
      "valid_from": "2019-09-07T12:40:13.104Z"
    },
    {
      "type": "indicator",
      "id": "indicator--0461539a-dc75-4cd1-ab74-24d964c8609c",
      "created": "2019-09-07T12:40:13.104Z",
      "modified": "2019-09-07T12:40:13.104Z",
      "labels": [
        "malicious-activity"
      ],
      "pattern": "[file:hashes.md5 = 'f6f8179ac71eaabff12b8c024342109b']",
      "valid_from": "2019-09-07T12:40:13.104Z"
    }
  ]
}
```

The following indicator patterns are supported.

- ipv4-addr
- ipv6-addr
- domain-name
- url
- email-addr
- file:hashes.{md5|sha1|sha256|sha512}

## Alternatives

- Python:
  - [InQuest/python-iocextract](https://github.com/InQuest/python-iocextract)
  - [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract)
  - [fhightower/ioc-finder](https://github.com/fhightower/ioc-finder)
- Golang:
  - [sroberts/cacador](https://github.com/sroberts/cacador)
