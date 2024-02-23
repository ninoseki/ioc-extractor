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
  -ns, --no-strict  Disable strict option
  -nr, --no-refang  Disable refang option
  -p, --punycode    Enable punycode option
  -h, --help        display help for command
```

```bash
$ echo "1.1.1.1 8.8.8.8 example.com" | ioc-extractor | jq
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
```

### As a library

```ts
import { extractIOC } from "ioc-extractor";

const input = "1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b";
const ioc = extractIOC(input);
console.log(ioc.md5s);
// => ['f6f8179ac71eaabff12b8c024342109b']
console.log(ioc.ipv4s);
// => ['1.1.1.1']
console.log(ioc.domains);
// => ['google.com']
```

`extractIOC` takes the following options:

- [strict](#strict)
- [refang](#refang)
- [punycode](#punycode)

If you want to extract a specific type of IoC, you can use extract function.

```ts
import {
  refang,
  extractDomains,
  extractIPv4s,
  extractMD5s,
} from "ioc-extractor";

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

Network related extract functions (e.g. `extractDomains`) can take the following options:

- [strict](#strict)

See [docs](https://ninoseki.github.io/ioc-extractor/) for more details.

## IoC Types

This package supports the following IoCs:

- **Hashes**: MD5, SHA1, SHA256, SHA512, SSDEEP
- **Networks**: domain, email, IPv4, IPv6, URL, ASN
- **Hardwares**: MAC address
- **Utilities**: CVE (CVE ID)
- **Cryptocurrencies**: BTC (BTC address), ETH (ETH address), XMR (XMR address)
- **Trackers**: GA track ID (Google Analytics tracking ID), GA pub ID (Google Adsense Publisher ID)

## Refang Techniques

For **Networks** IoCs, the following refang techniques are supported:

| Techniques                           | Defanged                               | Refanged                        |
| ------------------------------------ | -------------------------------------- | ------------------------------- |
| `.` in spaces                        | `1.1.1 . 1`                            | `1.1.1.1`                       |
| `.` in brackets, parentheses, etc.   | `1.1.1[.]1`                            | `1.1.1.1`                       |
| `dot` in brackets, parentheses, etc. | `example[dot]com`                      | `example.com`                   |
| Back slash before `.`                | `example\.com`                         | `example.com`                   |
| `/` in brackets, parentheses, etc.   | `http://example.com[/]path`            | `http://example.com/path`       |
| `://` in brackets, parentheses, etc. | `http[://]example.com`                 | `http://example.com`            |
| `:` in brackets, parentheses, etc.   | `http[:]//example.com`                 | `http://example.com`            |
| `@` in brackets, parentheses, etc.   | `test[@]example.com`                   | `test@example.com`              |
| `at` in brackets, parentheses, etc.  | `test[at]example.com`                  | `test@example.com`              |
| `hxxp`                               | `hxxps://example.com`                  | `https://example.com`           |
| Partial                              | `1.1.1[.1`                             | `1.1.1.1`                       |
| Any combination                      | `hxxps[:]//test\.example[.)com[/]path` | `https://test.example.com/path` |

## Options

### `strict`

Whether to do strict [TLD](https://en.wikipedia.org/wiki/Top-level_domain) matching or not. Defaults to `true`.

### `refang`

Whether to do refang or not. Defaults to `false`.

### `punycode`

Whether to do [Punycode](https://en.wikipedia.org/wiki/Punycode) conversion or not. Defaults to `false`.

## Alternatives

- [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract)
- [fhightower/ioc-finder](https://github.com/fhightower/ioc-finder)
- [InQuest/python-iocextract](https://github.com/InQuest/python-iocextract)
- [sroberts/cacador](https://github.com/sroberts/cacador)
