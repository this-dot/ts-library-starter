import { IReduceCallback } from './Interfaces';
import eachProperty from './eachProperty';

/**
 * Produce one value after iterating over all keys and their correspo
 * @param object 
 * @param fn 
 * @param result 
 */
export default function reduceObject(object: {}, reducer: IReduceCallback, accumulator: any = {}) {
  eachProperty(object, function(name, value) {
    accumulator = reducer(accumulator, value, name);
  });
  return accumulator;
}
