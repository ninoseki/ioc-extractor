import { expect } from 'chai';
import * as fs from 'fs';
import 'mocha';
import * as path from 'path';
import { getIOC } from '../index';

describe('IOCExtractor', () => {
  context('simple input', () => {
    it('should extract IOCs from the input', () => {
      const input = '1.1.1[.]1 google(.)com https://www.google[.]com f6f8179ac71eaabff12b8c024342109b 275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f';
      const ioc = getIOC(input);

      expect(ioc.hashes.md5s[0]).to.equal('f6f8179ac71eaabff12b8c024342109b');
      expect(ioc.hashes.md5s.length).to.equal(1);
      expect(ioc.hashes.sha256s[0]).to.equal('275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f');
      expect(ioc.hashes.sha256s.length).to.equal(1);
      expect(ioc.networks.domains[0]).to.equal('google.com');
      expect(ioc.networks.ipv4s[0]).to.equal('1.1.1.1');
      expect(ioc.networks.urls[0]).to.equal('https://www.google.com');
      expect(ioc.files.docs).to.deep.equal([]);
      expect(ioc.utilities.cves).to.deep.equal([]);
    });
  });
  context('complex input', () => {
    it('should extract IOCs from the input', () => {
      const input: string = fs.readFileSync(path.resolve(__dirname, './fixtures/input.txt')).toString();
      const ioc = getIOC(input);

      expect(ioc.hashes.md5s).to.deep.equal(['68b329da9893e34099c7d8ad5cb9c940']);
      expect(ioc.hashes.sha1s).to.deep.equal(['adc83b19e793491b1c6ea0fd8b46cd9f32e592fc']);
      expect(ioc.hashes.sha256s).to.deep.equal(['01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b']);
      expect(ioc.hashes.sha512s).to.deep.equal(['be688838ca8686e5c90689bf2ab585cef1137c999b48c70b92f67a5c34dc15697b5d11c982ed6d71be1e1e7f7b4e0733884aa97c3f7a339a8ed03577cf74be09']);

      expect(ioc.networks.ipv4s).to.deep.equal(['192.168.0.1', '123.123.123.123']);
      expect(ioc.networks.ipv6s).to.deep.equal(['fdc4:2581:575b:5a72:0000:0000:0000:0001']);
      expect(ioc.networks.domains).to.deep.equal(['example.com', 'exa-mple.com', 'ex4mple.com', 'short.is']);
      expect(ioc.networks.urls).to.deep.equal([
        'http://192.168.0.1',
        'http://192.168.0.1:80/path',
        'http://example.com:80/path',
        'http://example.com/',
        'http://example.com',
        'http://exa-mple.com',
        'http://ex4mple.com',
        'http://123.123.123.123/test',
      ]);

      expect(ioc.files.docs).to.deep.equal(['bad.doc']);
    });
  });
});
