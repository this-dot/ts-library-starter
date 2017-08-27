import { lensPath, view } from 'ramda';

export default function get(
  path: Array<string | number>,
  data: {} | Array<any>,
): any {
  let lens = lensPath(path);
  return view(lens, data);
}
