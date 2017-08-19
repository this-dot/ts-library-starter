import { IMapCallback } from './Interfaces';
import reduceObject from './reduceObject';

/**
 * Maps over the keys of an object converting the values of 
 * those keys into new objects. The return value will be an object 
 * with the same set of keys, but a different set of values. E.g.
 *
 * > mapObject({first: 1, second: 2}, (value, key) => value *2)
 *
 *   {first: 2, second: 4}
 */
export default function mapObject(object: {}, callback: IMapCallback) {
  return reduceObject(object, (result, value, index) => {
    return {
      ...result,
      [index]: callback(value, index),
    };
  });
}
