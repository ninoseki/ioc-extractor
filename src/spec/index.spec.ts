import { expect } from 'chai';
import 'mocha';
import { getIOC } from '../index';

describe('IOCExtractor', () => {
  it('should extract IOCs from the input', () => {
    const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b';
    const ioc = getIOC(input);
    expect(ioc.hashes.md5![0]).to.equal('f6f8179ac71eaabff12b8c024342109b');
    expect(ioc.networks.domain![0]).to.equal('google.com');
    expect(ioc.networks.ipv4![0]).to.equal('1.1.1.1');
    expect(ioc.files.doc).to.equal(null);
    expect(ioc.utilities.cve).to.equal(null);
  });
});
