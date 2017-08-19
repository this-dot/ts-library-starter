import mapObject from './mapObject';

describe('mapObject', () => {
  const original = { first: 1, second: 2 };
  let callback;
  let result;

  describe('callback use', () => {
    beforeEach(() => {
      callback = jest.fn();
      result = mapObject(original, callback);
    });

    it('was called twice', () => {
      expect(callback.mock.calls.length).toEqual(2);
    });

    it('was called with key and value', () => {
      expect(callback.mock.calls[0]).toEqual([1, 'first']);
      expect(callback.mock.calls[1]).toEqual([2, 'second']);
    });
  });

  describe('result', () => {
    beforeEach(() => {
      result = mapObject(original, (value, key) => value * 2);
    });

    it('returns a new object', () => {
      expect(original).not.toEqual(result);
    });

    it('returns a hash with result of the callback', () => {
      expect(result).toEqual({ first: 2, second: 4 });
    });
  });
});
