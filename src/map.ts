import mapObject from './mapObject';
import { IData, IMapCallback, IPath } from './Interfaces';
import { lensPath, set, view } from 'ramda';
import * as isObject from 'lodash.isobject';

export default function map(path: IPath, callback: IMapCallback, data: IData) {
  let lense = lensPath(path);
  let target = view(lense, data);
  if (Array.isArray(target)) {
    return set(lense, target.map(callback), data);
  } else if (isObject(target)) {
    return set(lense, mapObject(target, callback), data);
  } else {
    throw new Error(
      `map expected an array or an object at ${path.join('.')}, found ${target} instead`
    );
  }
}
