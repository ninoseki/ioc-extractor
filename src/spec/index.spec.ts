import { expect } from 'chai';
import 'mocha';
import { getIOC } from '../index';

describe('IOCExtractor', () => {
  it('should extract IOCs from the input', () => {
    const input = '1.1.1[.]1 google(.)com f6f8179ac71eaabff12b8c024342109b 275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f';
    const ioc = getIOC(input);

    expect(ioc.hashes.md5s![0]).to.equal('f6f8179ac71eaabff12b8c024342109b');
    expect(ioc.hashes.md5s!.length).to.equal(1);
    expect(ioc.hashes.sha256s![0]).to.equal('275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f');
    expect(ioc.hashes.sha256s!.length).to.equal(1);
    expect(ioc.networks.domains![0]).to.equal('google.com');
    expect(ioc.networks.ipv4s![0]).to.equal('1.1.1.1');
    expect(ioc.files.docs).to.equal(null);
    expect(ioc.utilities.cves).to.equal(null);
  });
});
