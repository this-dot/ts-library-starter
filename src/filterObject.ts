import { IFilterCallback } from './Interfaces';
import reduceObject from './reduceObject';

/**
 * Create a new hash with keys and their corresponding values 
 * removed based on result of callback operation. E.g.
 * 
 * filterObject({ small: 1, smallish: 2, big: 4}, (key, value) => value < 3 })
 *  
 *  { small: 1, smallish: 2 } 
 * 
 * @param object: {}
 * @param callback: IFilterCallback 
 */
export default function filterObject(object: {}, callback: IFilterCallback) {
  return reduceObject(
    object,
    (result, value, key) => {
      if (callback(value, key)) {
        return {
          ...result,
          [key]: value,
        };
      }
      return result;
    },
    {}
  );
}
