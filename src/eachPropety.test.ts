'use strict';

import 'jest';
// tslint:disable-next-line:no-unused-expression
import 'babel-core/register';
// tslint:disable-next-line:no-unused-expression
import 'babel-polyfill';

import eachProperty from './eachProperty';

describe('eachProperty', () => {
  let callback;
  beforeEach(() => {
    callback = jest.fn();
    eachProperty({ a: 'b', c: 'd' }, callback);
  });
  it('invokes callback for each property', () => {
    expect(callback.mock.calls.length).toEqual(2);
  });
  it('passes key and value to callback', () => {
    expect(callback.mock.calls[0]).toEqual(['a', 'b']);
    expect(callback.mock.calls[1]).toEqual(['c', 'd']);
  });
});
