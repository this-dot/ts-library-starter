import 'jest';

import reduce from './reduce';

describe('reduce', () => {
  it('reduces object at path', () => {
    expect(
      reduce(['a', 'b'], (acc, value, index) => `${acc}${index}${value}`, '', {
        a: { b: { c: 'd', e: 'f' } },
      })
    ).toEqual({ a: { b: 'cdef' } });
  });
  it('reduces arrays at path', () => {
    expect(
      reduce(['a', 'b'], (acc, value, index) => `${acc}${value}${index}`, '', {
        a: { b: ['c', 'd', 'e'] },
      })
    ).toEqual({
      a: { b: 'c0d1e2' },
    });
  });
  it('throws an error if something other than array or object is at path', () => {
    expect(() => {
      reduce(['a', 'b'], (acc, value, index) => `${acc}${value}`, '', { a: { b: null } });
    }).toThrowError(/reduce expected an array or an object at a\.b, found null instead/);
  });
});
