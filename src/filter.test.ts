import 'jest';

import filter from './filter';

describe('filter', () => {
  it('removes items from array at path', () => {
    expect(
      filter(['a', 'b'], (value, index: number) => index % 2 === 0, {
        a: { b: ['c', 'd', 'e', 'f'] },
      })
    ).toEqual({
      a: { b: ['c', 'e'] },
    });
  });
  it('removes items from object at path', () => {
    expect(
      filter(['a', 'b'], (value, index: string) => index.indexOf('small') !== -1, {
        a: { b: { small: 1, smallish: 5, smaller: 10, big: 30 } },
      })
    ).toEqual({ a: { b: { small: 1, smallish: 5, smaller: 10 } } });
  });
  it('throws an exception when encounters anything other than array or object', () => {
    expect(() => {
      filter(['a', 'b'], (value, index: string) => value !== null, { a: { b: 123 } });
    }).toThrowError(/filter expected an array or an object at a\.b, found 123 instead/);
  });
});
