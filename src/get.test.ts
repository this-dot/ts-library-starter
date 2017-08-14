'use strict';

import 'jest';
// tslint:disable-next-line:no-unused-expression
import 'babel-core/register';
// tslint:disable-next-line:no-unused-expression
import 'babel-polyfill';

import get from './get';

describe('get', () => {
  describe('array', () => {
    const original = [{ a: { b: { c: 'd' } } }, { e: 'f' }];

    it('gets value from deeply nested path', () => {
      expect(get([0, 'a', 'b', 'c'], original)).toEqual('d');
    });
  });

  describe('object', () => {
    const original = { a: { b: { c: 'd' } } };
    it('gets value an object', () => {
      expect(get(['a', 'b', 'c'], original)).toEqual('d');
    });
  });
});
