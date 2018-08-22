import { expect } from 'chai';
import 'mocha';
import { clean, dedup } from '../aux/auxiliary';

describe('clean', () => {
  it('should remove parentheses and brackets in the input', () => {
    const input = '1.1.1[.]1\n1.1.1(.)1\ngithub(.]com\ngithub(.]com';
    expect(clean(input)).to.equal('1.1.1.1\n1.1.1.1\ngithub.com\ngithub.com');
  });
  it('should replace hxxp to http', () => {
    const input = 'hxxps://google.com\nhxxp://neverssl.com\nhxxps://google[.)com';
    expect(clean(input)).to.equal('https://google.com\nhttp://neverssl.com\nhttps://google.com');
  });
});
describe('dedup', () => {
  it('should filter to unique ones', () => {
    const input = ['1.1.1.1', '1.1.1.1', 'github.com', 'github.com'];
    expect(dedup(input)).to.deep.equal(['1.1.1.1', 'github.com']);
  });
});
