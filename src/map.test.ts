import 'jest';

import map from './map';

describe('map', () => {
  it('applies callback to all items in array at given path', () => {
    expect(map(['a', 'b'], value => value.toUpperCase(), { a: { b: ['c', 'd', 'e'] } })).toEqual({
      a: { b: ['C', 'D', 'E'] },
    });
  });
  it('applies callback to all items in an object at given path', () => {
    expect(map(['a', 'b'], value => `~~${value}~~`, { a: { b: { c: 'd', e: 'f' } } })).toEqual({
      a: { b: { c: '~~d~~', e: '~~f~~' } },
    });
  });
  it('throws an exception when encoutered something other than an array or object at path', () => {
    expect(() => {
      map(['a', 'b'], (value, index: string) => value !== null, { a: { b: 123 } });
    }).toThrowError(/map expected an array or an object at a\.b, found 123 instead/);
  });
});
