import { lensPath, set as lensSet } from 'ramda';

/**
 * Return a new object with property at given path replaced with provided value.
 * 
 * set(['a'], 'z', { a: b: {c: 'd'} } ) 
 * //=> { a: 'z' }
 * 
 * set(['0', 'a', 'b'], 'z', [{ a: b: {c: 'd'} }])
 * // => [{a: { b: 'z'} }]
 * 
 * @param path Array<string | number>
 * @param value any
 * @param data {} | Array<any>
 */
export default function set(
  path: Array<string | number>,
  value: any,
  data: {} | Array<any>,
) {
  let lens = lensPath(path);
  return lensSet(lens, value, data);
}
