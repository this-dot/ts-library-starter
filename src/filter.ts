import filterObject from './filterObject';
import { IData, IFilterCallback, IPath } from './Interfaces';
import { lensPath, view, set } from 'ramda';
import * as isObject from 'lodash.isobject';

export default function filter(path: IPath, callback: IFilterCallback, data: IData) {
  let lense = lensPath(path);
  let target = view(lense, data);
  if (Array.isArray(target)) {
    return set(lense, target.filter(callback), data);
  } else if (isObject(target)) {
    return set(lense, filterObject(target, callback), data);
  } else {
    throw new Error(
      `filter expected an array or an object at ${path.join('.')}, found ${target} instead`
    );
  }
}
