# IoC extractor

[![npm version](https://badge.fury.io/js/ioc-extractor.svg)](https://badge.fury.io/js/ioc-extractor)
![Node.js CI](https://github.com/ninoseki/ioc-extractor/workflows/Node.js%20CI/badge.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/ninoseki/ioc-extractor/badge)](https://www.codefactor.io/repository/github/ninoseki/ioc-extractor)
[![Coverage Status](https://coveralls.io/repos/github/ninoseki/ioc-extractor/badge.svg)](https://coveralls.io/github/ninoseki/ioc-extractor)
[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://ninoseki.github.io/ioc-extractor/)

IoC extractor is an npm package for extracting common [IoC (Indicator of Compromise)](https://en.wikipedia.org/wiki/Indicator_of_compromise) from a block of text.

**Note**: the package is highly influenced by [cacador](https://github.com/sroberts/cacador).

## Installation

```sh
npm install -g ioc-extractor
# or if you want to use ioc-extractor as a library in your JS/TS project
npm install ioc-extractor
```

## Usage

### As a CLI

```bash
$ ioc-extractor --help
Usage: ioc-extractor [options]

Options:
  -t, --threads         use threads (default: false)
  --disable-idn         disable IDN extraction (default: false)
  --disable-strict-tld  disable strict TLD validation (default: false)
  --disable-refang      disable refang (default: false)
  -h, --help            display help for command
```

```bash
$ echo "1.1.1.1 8.8.8.8 example.com" | ioc-extractor
{"asns":[],"btcs":[],"cves":[],"domains":["example.com"],"emails":[],"eths":[],"gaPubIDs":[],"gaTrackIDs":[],"ipv4s":["1.1.1.1","8.8.8.8"],"ipv6s":[],"macAddresses":[],"md5s":[],"sha1s":[],"sha256s":[],"sha512s":[],"ssdeeps":[],"urls":[],"xmrs":[]}

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
  "eths": [],
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

# Using -t(--threads) option makes sense if you want to process a big chunk of text
$ cat big.txt | ioc-extractor -t
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
import { refang, extractDomains, extractIPv4s, extractMD5s } from "ioc-extractor";

const input = "1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b";
const refanged = refang(input);
// => 1.1.1.1 google.com f6f8179ac71eaabff12b8c024342109b

const ipv4s = extractIPv4s(refanged);
// => ['1.1.1.1']

const domains = extractDomains(refanged);
// => ['google.com']

const md5s = extractMD5s(refanged);
// => ['f6f8179ac71eaabff12b8c024342109b']
```

See [docs](https://ninoseki.github.io/ioc-extractor/) for more details.

## Details

This package supports the following IOCs:

- **Hashes**: md5, sha1, sha256, sha512, ssdeep
- **Networks**: domain, email, ipv4, ipv6, url, asn
- **Hardwares**: mac_address
- **Utilities**: cve(CVE ID)
- **Cryptocurrencies**: btc (BTC address), eth (ETH address), xmr (XMR address)
- **Trackers**: gaTrackID (Google Analytics tracking ID), gaPubID (Google Adsense Publisher ID)

For **Networks** IOCs, the following defang/refang techniques are supported:

| Techniques       | Defanged                               | Refanged                        |
|------------------|----------------------------------------|---------------------------------|
| ` . ` => `.`     | `1.1.1 . 1`                            | `1.1.1.1`                       |
| `[.]` => `.`     | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `(.)` => `.`     | `1.1.1(.)1`                            | `1.1.1.1`                       |
| `{.}` => `.`     | `1.1.1{.}1`                            | `1.1.1.1`                       |
| `\.`  => `.`     | `example\.com`                         | `example.com`                   |
| `[/]` => `/`     | `http://example.com[/]path`            | `http://example.com/path`       |
| `[:]` => `:`     | `http[:]//example.com`                 | `http://example.com`            |
| `[://]` => `://` | `http[://]example.com`                 | `http://example.com`            |
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

## Known limitations

A domain with an IDN TLD (e.g. `みんな`) is not supported.
Please convert an input into Punycode beforehand. Then it will work.

```
# OK
xn--p8j9a0d9c9a.xn--q9jyb4c
はじめよう.com

# NG
はじめよう.みんな
example.みんな
```

## Alternatives

- Python:
  - [InQuest/python-iocextract](https://github.com/InQuest/python-iocextract)
  - [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract)
  - [fhightower/ioc-finder](https://github.com/fhightower/ioc-finder)
- Golang:
  - [sroberts/cacador](https://github.com/sroberts/cacador)
