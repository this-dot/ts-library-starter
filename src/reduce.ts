import { IData, IPath, IReduceCallback } from './Interfaces';
import { lensPath, set, view } from 'ramda';
import * as isObject from 'lodash.isobject';
import reduceObject from './reduceObject';

export default function reduce(
  path: IPath,
  reducer: IReduceCallback,
  initialValue: any,
  data: IData
) {
  let lense = lensPath(path);
  let target = view(lense, data);
  if (Array.isArray(target)) {
    return set(lense, target.reduce(reducer, initialValue), data);
  } else if (isObject(target)) {
    return set(lense, reduceObject(target, reducer, initialValue), data);
  } else {
    throw new Error(
      `reduce expected an array or an object at ${path.join('.')}, found ${target} instead`
    );
  }
}
