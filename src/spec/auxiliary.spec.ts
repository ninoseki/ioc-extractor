import { expect } from 'chai';
import 'mocha';
import { clean, dedup } from '../aux/auxiliary';

describe('clean', () => {
  it('should remove parentheses and brackets in the input', () => {
    const input = '1.1.1[.]1\n1.1.1(.)1\ngithub(.]com\ngithub(.]com';
    expect(clean(input)).to.equal('1.1.1.1\n1.1.1.1\ngithub.com\ngithub.com');
  });
});

describe('dedup', () => {
  it('should filter to unique ones', () => {
    const input = '1.1.1.1\n1.1.1.1\ngithub.com\ngithub.com';
    expect(dedup(input)).to.equal('1.1.1.1 github.com');
  });
});
