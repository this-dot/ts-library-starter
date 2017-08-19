import 'jest';

import push from './push';

describe('push', () => {
  let original = { a: [] };
  it('appends item to the end of the array', () => {
    expect(push(['a'], 'b', original)).toEqual({ a: ['b'] });
    expect(original).toEqual({ a: [] });
  });

  it('throws an exception if path can not be matches', () => {
    expect(() => {
      push(['d'], 'c', original);
    }).toThrowError(/push expected array at path d, got undefined instead/);
  });

  it('can push into array of arrays', () => {
    expect(push([0, 1], 'c', [[[], ['b']]])).toEqual([[[], ['b', 'c']]]);
  });
});
