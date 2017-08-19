import filterObject from './filterObject';

describe('filterObject', () => {
  let original = { small: 1, smallish: 2, big: 4 };
  let callback, result;

  describe('callback use', () => {
    beforeEach(() => {
      callback = jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(undefined);
      result = filterObject(original, callback);
    });
    it('was called three times', () => {
      expect(callback.mock.calls.length).toEqual(3);
    });
    it('removed items that returned false', () => {
      expect(result).toEqual({ smallish: 2 });
    });
    it('passed key and value', () => {
      expect(callback.mock.calls[0]).toEqual([1, 'small']);
      expect(callback.mock.calls[1]).toEqual([2, 'smallish']);
      expect(callback.mock.calls[2]).toEqual([4, 'big']);
    });
  });

  describe('result', () => {
    beforeEach(() => {
      result = filterObject(original, (value, key: string) => key.indexOf('small') === -1);
    });

    it('returns a new object', () => {
      expect(result).not.toEqual(original);
    });

    it('returns filtered hash', () => {
      expect(result).toEqual({ big: 4 });
    });
  });
});
