import reduceObject from './reduceObject';

describe('reduceObject', () => {
  let original = { small: 1, smallish: 2, big: 4 };
  let callback, result;

  describe('callback use', () => {
    beforeEach(() => {
      callback = jest
        .fn()
        .mockReturnValueOnce({ SMALL: 10 })
        .mockReturnValueOnce({ SMALL: 10, SMALLISH: 20 })
        .mockReturnValueOnce({ SMALL: 10, SMALLISH: 20, BIG: 40 });
      result = reduceObject(original, callback);
    });
    it('was called three times', () => {
      expect(callback.mock.calls.length).toEqual(3);
    });
    it('returned the last return value', () => {
      expect(result).toEqual({ SMALL: 10, SMALLISH: 20, BIG: 40 });
    });
    it('was invoked with expected arguments', () => {
      expect(callback.mock.calls[0]).toEqual([{}, 1, 'small']);
      expect(callback.mock.calls[1]).toEqual([{ SMALL: 10 }, 2, 'smallish']);
      expect(callback.mock.calls[2]).toEqual([{ SMALL: 10, SMALLISH: 20 }, 4, 'big']);
    });
  });

  describe('result', () => {
    beforeEach(() => {
      result = reduceObject(original, (result, value, key: string) => {
        return {
          ...result,
          [key.toUpperCase()]: value * 10,
        };
      });
    });

    it('returned a new object', () => {
      expect(result).not.toEqual(original);
    });

    it('returned expected result', () => {
      expect(result).toEqual({
        SMALL: 10,
        SMALLISH: 20,
        BIG: 40,
      });
    });
  });
});
