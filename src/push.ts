import { IData, IPath } from './Interfaces';
import { lensPath, view, set } from 'ramda';

export default function push(path: IPath, value: any, data: IData) {
  let lense = lensPath(path);
  let target = view(lense, data);
  if (Array.isArray(target)) {
    return set(lense, [...target, value], data);
  } else {
    throw new Error(
      `push expected array at path ${path.join(
        '.'
      )}, got ${typeof target} instead`
    );
  }
}
